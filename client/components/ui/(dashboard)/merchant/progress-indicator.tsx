'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  id: number
  title: string
  key: string
}

interface ProgressIndicatorProps {
  steps: Step[]
  currentStep: number
  onStepClick: (step: number) => void
}

export default function ProgressIndicator({
  steps,
  currentStep,
  onStepClick,
}: ProgressIndicatorProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center min-w-0">
              <button
                onClick={() => onStepClick(step.id)}
                className={cn(
                  'flex flex-col items-center py-4 px-2 sm:px-4 transition-colors min-w-0',
                  currentStep === step.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-colors',
                    currentStep === step.id
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-center truncate max-w-20 sm:max-w-none">
                  {step.title}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className="w-8 sm:w-12 h-px bg-gray-200 dark:bg-gray-700 mx-1 sm:mx-2 flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
