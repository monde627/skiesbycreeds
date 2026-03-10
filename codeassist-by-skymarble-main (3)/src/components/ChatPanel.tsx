import { useRef, useEffect } from 'react'
import type { useAgent } from '@blinkdotnew/react'
import { Send, Sparkles, User, Bot, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

interface ChatPanelProps extends ReturnType<typeof useAgent> {
  mode: 'ask' | 'agent'
  setMode: (mode: 'ask' | 'agent') => void
  isInitializing: boolean
}

export function ChatPanel({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  mode,
  setMode,
  isInitializing
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="h-full flex flex-col border-r bg-background">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-display font-bold text-lg flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          CodeAssist
        </h2>
        <div className="flex p-1 bg-muted rounded-lg border">
          <button
            onClick={() => setMode('ask')}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-all",
              mode === 'ask' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Ask
          </button>
          <button
            onClick={() => setMode('agent')}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-all",
              mode === 'agent' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Agent
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
            <Bot className="w-12 h-12 mb-4" />
            <p className="text-sm">I'm ready to help. What are we building today?</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex gap-3",
                m.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                m.role === 'user' ? "bg-secondary" : "bg-primary/10 border-primary/20"
              )}>
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
              </div>
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted/50 border border-border/50"
              )}>
                {m.content}
                {m.parts?.map((part, i) => (
                  part.type === 'tool-invocation' && (
                    <div key={i} className="mt-2 pt-2 border-t border-border/20 flex items-center gap-2 text-[10px] font-mono opacity-60">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span>{part.toolName}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
            <div className="bg-muted/50 border border-border/50 rounded-2xl px-4 py-2.5 text-sm">
              Thinking...
            </div>
          </div>
        )}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error.message}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-muted/10">
        <form
          onSubmit={handleSubmit}
          className="relative group flex items-end gap-2"
        >
          <div className="flex-1 bg-background border border-border rounded-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all overflow-hidden">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as any)
                }
              }}
              placeholder={isInitializing ? "Initializing sandbox..." : "How can I help you today?"}
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 resize-none p-4 text-sm min-h-[56px] max-h-[200px]"
              disabled={isLoading || isInitializing}
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isInitializing}
            className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-elegant disabled:opacity-50 disabled:scale-100 transition-all hover:scale-105 active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
        <p className="mt-2 text-[10px] text-center text-muted-foreground uppercase tracking-widest font-medium">
          Powered by Skymarble Technologies
        </p>
      </div>
    </div>
  )
}
