import { useState, useEffect } from 'react'
import { useAgent, useBlinkAuth } from '@blinkdotnew/react'
import type { Sandbox } from '@blinkdotnew/react'
import { codingAgent, askAgent } from '../lib/agent'
import { blink } from '../lib/blink'
import { getPreviewUrl } from '../lib/sandbox'
import { ChatPanel } from './ChatPanel'
import { Sidebar } from './ui/sidebar'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable'
import { Code2, Play, MessageSquare, Settings, Zap, Terminal } from 'lucide-react'

export function EditorLayout() {
  const [sandbox, setSandbox] = useState<Sandbox | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [mode, setMode] = useState<'ask' | 'agent'>('agent')
  const [isInitializing, setIsInitializing] = useState(false)

  useEffect(() => {
    setIsInitializing(true)
    blink.sandbox.create({ template: 'devtools-base' })
      .then(setSandbox)
      .finally(() => setIsInitializing(false))
  }, [])

  const currentAgent = mode === 'agent' ? codingAgent : askAgent

  const agentState = useAgent({
    agent: currentAgent,
    sandbox: sandbox || undefined,
    onFinish: () => {
      if (sandbox) {
        setPreviewUrl(getPreviewUrl(sandbox.id))
      }
    }
  })

  return (
    <div className="h-screen w-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 border-r flex flex-col items-center py-4 gap-4 bg-muted/30">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-elegant">
          <Zap className="text-primary-foreground w-6 h-6" />
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-4">
          <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Code2 className="w-5 h-5" />
          </button>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors mt-auto">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Chat Panel */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <ChatPanel 
            {...agentState} 
            mode={mode} 
            setMode={setMode} 
            isInitializing={isInitializing}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={70}>
          <div className="h-full flex flex-col bg-muted/10">
            <div className="h-12 border-b flex items-center px-4 justify-between bg-background">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-md border text-xs font-mono text-muted-foreground">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.open(previewUrl, '_blank')}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors disabled:opacity-50"
                  disabled={!previewUrl}
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              {previewUrl ? (
                <iframe 
                  src={previewUrl} 
                  className="w-full h-full border-none"
                  title="CodeAssist Preview"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                    <Code2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">Build something incredible</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Describe your project to CodeAssist and watch it come to life in real-time.
                  </p>
                </div>
              )}
              {agentState.isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-4">
                    <Spinner className="w-8 h-8 text-primary" />
                    <p className="text-sm font-medium animate-pulse">Building your application...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
