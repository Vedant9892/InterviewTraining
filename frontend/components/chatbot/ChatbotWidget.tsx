"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

// Web Speech API types (not in all browsers)
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

function getBotResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! Great to meet you. How can I help with your interview practice today?";
  }
  if (lower.includes("help")) {
    return "I'm here to help! Ask me about interview tips, practice questions, or how to improve your presence. Try: 'How do I improve eye contact?' or 'Give me a sample question'.";
  }
  if (lower.includes("thank")) {
    return "You're welcome! Is there anything else I can help with?";
  }
  if (lower.includes("bye") || lower.includes("goodbye")) {
    return "Goodbye! Good luck with your interview practice. Come back anytime!";
  }
  if (lower.includes("interview") || lower.includes("practice")) {
    return "Great question! Use the Setup page to choose an interview type, grant camera access, then start your session. The live interview will analyze your eye contact, confidence, and more.";
  }
  if (lower.includes("eye contact") || lower.includes("eyecontact")) {
    return "Eye contact tips: Look at the camera lens, not yourself. Practice with short glances—3–5 seconds—then briefly look away. Keep your face well-lit and centered in frame.";
  }
  if (lower.includes("confidence")) {
    return "To appear more confident: Sit up straight, speak clearly, and pause before answering. Practice out loud—it builds familiarity. The system tracks your confidence in real time.";
  }
  return `You said: "${userMessage}". I'm your interview assistant. Try asking about help, interview tips, eye contact, or confidence!`;
}

function AvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
    </svg>
  );
}

function MicOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI =
      typeof window !== "undefined"
        ? (window.SpeechRecognition || window.webkitSpeechRecognition)
        : undefined;
    setIsSupported(!!SpeechRecognitionAPI);

    if (SpeechRecognitionAPI) {
      const recognition = new SpeechRecognitionAPI() as SpeechRecognitionInstance;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        let final = "";
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const result = e.results[i];
          const transcriptPart = result[0]?.transcript ?? "";
          if (result.isFinal) {
            final += transcriptPart;
          } else {
            interim += transcriptPart;
          }
        }
        setTranscript((prev) => prev + final + interim);
      };

      recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
        if (e.error !== "aborted" && e.error !== "no-speech") {
          console.warn("Speech recognition error:", e.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setTranscript("");
    recognitionRef.current.start();
    setIsListening(true);
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return { isSupported, isListening, transcript, setTranscript, toggleListening };
}

function speakText(text: string, onEnd?: () => void) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;
  if (onEnd) {
    utterance.onend = onEnd;
  }
  window.speechSynthesis.speak(utterance);
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! 👋 How can I help you with your interview practice today?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const voiceInput = useSpeechRecognition();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Sync voice transcript to input
  useEffect(() => {
    if (voiceInput.transcript) {
      setInputValue(voiceInput.transcript);
    }
  }, [voiceInput.transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (voiceInput.isListening) {
      voiceInput.toggleListening();
    }
    const trimmed = inputValue.trim();
    if (!trimmed || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: trimmed,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const response = getBotResponse(trimmed);
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: response,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      // Optional: read bot response aloud
      if (typeof window !== "undefined" && window.speechSynthesis) {
        speakText(response);
      }
    }, delay);
  };

  const handleSpeakMessage = (content: string) => {
    speakText(content);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 flex h-14 w-14 min-w-[56px] min-h-[56px] items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
        style={{
          bottom: "max(1.5rem, env(safe-area-inset-bottom))",
          right: "max(1.5rem, env(safe-area-inset-right))",
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatBubbleIcon />}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed z-40 w-full max-w-[400px] transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 visible translate-y-0 scale-100"
            : "opacity-0 invisible translate-y-5 scale-95 pointer-events-none"
        }`}
        style={{
          bottom: "calc(max(1.5rem, env(safe-area-inset-bottom)) + 4rem)",
          left: "max(1.5rem, env(safe-area-inset-left))",
          right: "max(1.5rem, env(safe-area-inset-right))",
          height: "560px",
          maxHeight: "calc(100dvh - 140px)",
        }}
      >
        <div className="h-full flex flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-2xl overflow-hidden">
          {/* Header */}
          <header className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <AvatarIcon />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Assistant</h2>
              <span className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </span>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] animate-fade-in ${
                  msg.isUser ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                <div
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white ${
                    msg.isUser
                      ? "bg-[var(--accent-primary)]"
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}
                >
                  <AvatarIcon />
                </div>
                <div
                  className={`rounded-lg px-4 py-3 text-[0.9375rem] leading-relaxed ${
                    msg.isUser
                      ? "bg-[var(--accent-primary)] text-white"
                      : "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%] self-start animate-fade-in">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <AvatarIcon />
                </div>
                <div className="rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-4 py-3">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-[var(--text-tertiary)] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-3 p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              autoComplete="off"
              disabled={isTyping}
              className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3.5 text-[0.9375rem] text-white placeholder-[var(--text-secondary)] focus:border-[var(--accent-primary)] focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent-primary)] text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
