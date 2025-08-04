import { useState, useEffect } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Gift, Zap, CheckCircle } from "lucide-react"

interface AdModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  analysisInProgress?: boolean
}

export default function AdModal({ isOpen, onClose, onContinue, analysisInProgress = false }: AdModalProps) {
  const [countdown, setCountdown] = useState(8)
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setCountdown(8)
      setCanClose(false)
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  const handleContinue = () => {
    onContinue()
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={canClose ? onClose : () => {}} 
      size="lg"
      className="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              AI Analysis Starting
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Our advanced AI system is preparing to analyze your image using deep learning algorithms
          </p>
        </div>

        {/* Premium Ad Space */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
              ✨ Sponsored Content
            </Badge>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                🚀 Premium AI Tools & Services
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                Unlock the power of professional AI image analysis, batch processing, and advanced forensics. 
                Join thousands of users getting professional-grade results.
              </p>
            </div>

            {/* Mock Premium Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Batch Analysis</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Process up to 100 images at once
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">API Access</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Integrate into your applications
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Priority Support</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  24/7 expert assistance available
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-2 rounded-full transition-all duration-200 transform hover:scale-105"
                data-testid="upgrade-premium-button"
              >
                <Gift className="h-4 w-4 mr-2" />
                Upgrade to Premium - 50% Off
              </Button>
            </div>
          </div>
        </div>

        {/* Analysis Status */}
        {analysisInProgress && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Advanced neural network analysis in progress...
              </span>
            </div>
          </div>
        )}

        {/* Bottom Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            {canClose ? (
              <span className="text-green-600 dark:text-green-400 font-medium">Ready to continue</span>
            ) : (
              <span>Continue in {countdown} seconds</span>
            )}
          </div>
          
          <Button
            onClick={handleContinue}
            disabled={!canClose}
            className={cn(
              "font-medium px-6 py-2 rounded-full transition-all duration-200",
              canClose 
                ? "bg-green-600 hover:bg-green-700 text-white transform hover:scale-105" 
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            )}
            data-testid="continue-analysis-button"
          >
            <Play className="h-4 w-4 mr-2" />
            {canClose ? "Continue Analysis" : `Wait ${countdown}s`}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}