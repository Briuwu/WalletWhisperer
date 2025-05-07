"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define message schema for validation
const MessageSchema = z.object({
  role: z.enum(["assistant", "system", "user", "data"]),
  content: z.string().min(1, "Message content cannot be empty"),
});

const SessionSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  messages: z.array(MessageSchema).min(1, "At least one message is required"),
});

// Custom error class for better error handling
class SessionError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = "SessionError";
  }
}

export async function endSession(
  sessionId: string,
  messages: {
    role: "assistant" | "system" | "user" | "data";
    content: string;
  }[],
) {
  try {
    // Validate input
    const validatedData = SessionSchema.parse({ sessionId, messages });

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new SessionError("User not found", "AUTH_ERROR");
    }

    // Check if session already exists
    const { data: existingSession } = await supabase
      .from("sessions")
      .select("session_id")
      .eq("session_id", validatedData.sessionId)
      .single();

    if (existingSession) {
      throw new SessionError("Session already exists", "DUPLICATE_SESSION");
    }

    // Insert new session
    const { error } = await supabase.from("sessions").insert({
      session_id: validatedData.sessionId,
      user_id: user.id,
      history: JSON.stringify(validatedData.messages),
      has_generated_reports: false,
    });

    if (error) {
      throw new SessionError(
        `Failed to create session: ${error.message}`,
        "DB_ERROR",
      );
    }

    revalidatePath("/home/chat");
    return { success: true, message: "Session created successfully" };
  } catch (error) {
    if (error instanceof SessionError) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      throw new SessionError(
        `Validation error: ${error.errors.map((e) => e.message).join(", ")}`,
        "VALIDATION_ERROR",
      );
    }
    throw new SessionError(
      `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
      "UNKNOWN_ERROR",
    );
  }
}

export async function getSessions() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new SessionError("User not found", "AUTH_ERROR");
    }

    const { data, error } = await supabase
      .from("sessions")
      .select("session_id, session_goal, created_at, has_generated_reports")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new SessionError(
        `Failed to fetch sessions: ${error.message}`,
        "DB_ERROR",
      );
    }

    return data;
  } catch (error) {
    if (error instanceof SessionError) {
      throw error;
    }
    throw new SessionError(
      `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
      "UNKNOWN_ERROR",
    );
  }
}

// New function to get a single session
export async function getSession(sessionId: string) {
  try {
    if (!sessionId) {
      throw new SessionError("Session ID is required", "VALIDATION_ERROR");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new SessionError("User not found", "AUTH_ERROR");
    }

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("session_id", sessionId)
      .eq("user_id", user.id)
      .single();

    if (error) {
      throw new SessionError(
        `Failed to fetch session: ${error.message}`,
        "DB_ERROR",
      );
    }

    if (!data) {
      throw new SessionError("Session not found", "NOT_FOUND");
    }

    return data;
  } catch (error) {
    if (error instanceof SessionError) {
      throw error;
    }
    throw new SessionError(
      `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
      "UNKNOWN_ERROR",
    );
  }
}

// New function to delete a session
export async function deleteSession(sessionId: string) {
  try {
    if (!sessionId) {
      throw new SessionError("Session ID is required", "VALIDATION_ERROR");
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new SessionError("User not found", "AUTH_ERROR");
    }

    const { error } = await supabase
      .from("sessions")
      .delete()
      .eq("session_id", sessionId)
      .eq("user_id", user.id);

    if (error) {
      throw new SessionError(
        `Failed to delete session: ${error.message}`,
        "DB_ERROR",
      );
    }

    revalidatePath("/home/chat");
    revalidatePath("/home/history");
    return { success: true, message: "Session deleted successfully" };
  } catch (error) {
    if (error instanceof SessionError) {
      throw error;
    }
    throw new SessionError(
      `Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`,
      "UNKNOWN_ERROR",
    );
  }
}
