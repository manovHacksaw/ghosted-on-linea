"use client"

// Removed React import type, useState/useEffect/useCallback are imported directly
import { useEffect, useState, useCallback } from "react"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
// Assuming these components are now also .jsx or .js
import { EducationForm } from "./_components/education-form"
import { CareerAssessment } from "./_components/carrer-assessment" // Corrected typo if needed: career-assessment
import { ProcessingResults } from "./_components/processing-result" // Corrected typo if needed: processing-results
import { ExperienceForm } from "./_components/experience-form"
import { InterestsForm } from "./_components/interests-form"
import { SkillsForm } from "./_components/skills-form"

const steps = [
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "interests", title: "Interests" },
  { id: "experience", title: "Experience" },
  { id: "assessment", title: "Career Assessment" },
  { id: "results", title: "Results" }, // This step might only be for display or the processing state
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter();

  // Removed type annotation from useState
  const [formData, setFormData] = useState({
    account: {}, // Assuming account data might be added elsewhere
    education: {},
    skills: {},
    interests: {},
    experience: {},
    assessment: {},
  })

  // useCallback remains the same, no type annotations involved
  const updateFormData = useCallback((newData) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }, [])

  // useEffect remains the same
  useEffect(() => {
    console.log("Updated form data:", formData)
  }, [formData])

  const [isProcessing, setIsProcessing] = useState(false)

  // Removed type annotation from data parameter
  const handleNext = (data) => {
    const currentStepId = steps[currentStep].id

    // Use bracket notation which works fine in JS
    updateFormData({ [currentStepId]: data })

    // Check if it's the step *before* the final "results" display step
    // The assessment step is index 4, steps.length is 6. steps.length - 2 is 4.
    if (currentStep === steps.length - 2) {
      setIsProcessing(true)
      console.log("Starting processing with data:", { [currentStepId]: data }); // Log data being processed
      // Simulate processing time
      setTimeout(() => {
        console.log("Processing finished. Final form data:", { ...formData, [currentStepId]: data }); // Log final data before redirect
        setIsProcessing(false)
        // Redirect immediately after processing finishes
        // The "results" step is effectively replaced by the redirect here
        router.push('/dashboard');
      }, 3000) // 3 seconds delay
    } else if (currentStep < steps.length - 2) {
      // Move to the next step if it's not the assessment step yet
      setCurrentStep(currentStep + 1)
    }
    // Note: We don't manually advance to the "Results" step (index 5) anymore,
    // as the processing state handles the transition to the dashboard.
  }

  const handleBack = () => {
    // Prevent going back if processing or if at the first step
    if (!isProcessing && currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // renderStep remains mostly the same, just ensure props are passed correctly
  const renderStep = () => {
    // Ensure formData passed is the specific data for the current step
    // It might be initially empty {} if the user hasn't filled it yet
    const stepProps = {
      onSubmit: handleNext,
      formData: formData[steps[currentStep].id] || {}, // Pass existing data or empty object
    }

    switch (steps[currentStep].id) {
      case "education":
        return <EducationForm {...stepProps} />
      case "skills":
        return <SkillsForm {...stepProps} />
      case "interests":
        return <InterestsForm {...stepProps} />
      case "experience":
        return <ExperienceForm {...stepProps} />
      case "assessment":
        return <CareerAssessment {...stepProps} />
      // The "results" case is now handled by the isProcessing state and redirect
      // If you had a component to show *after* processing but *before* redirect,
      // it would go here, but the current logic redirects immediately.
      // case "results": // This case might not be reached with the current logic
      //   return <ProcessingResults formData={formData} /> // Or a different results component
      default:
        return null
    }
  }

  // Determine the title based on whether processing is happening
  const pageTitle = isProcessing ? "Processing Your Profile" :
                    currentStep === steps.length - 1 ? "Your Career Recommendations" : // This state might not be reachable now
                    "Create Your Profile";

  // Determine Card Title based on processing or current step
  const cardTitle = isProcessing ? "Analyzing..." : steps[currentStep]?.title || "Step"; // Use optional chaining

  // Determine Card Description
   const cardDescription = isProcessing
      ? "Please wait while we personalize your experience."
      : currentStep === steps.length - 1 // This state might not be reachable
      ? "Based on your profile and assessment, here are your personalized career recommendations."
      : `Please provide your ${steps[currentStep]?.title?.toLowerCase() || 'information'}.`; // Use optional chaining and default


  return (
    <div className="flex min-h-screen flex-col bg-black/[0.96] antialiased pt-20 bg-grid-white/[0.02]">
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {/* Use dynamic pageTitle */}
              <h1 className="text-2xl font-bold text-white">
                {pageTitle}
              </h1>
              {/* Show step count only when not processing */}
              {!isProcessing && (
                <div className="text-sm text-white/60">
                  {/* Adjust step count display if "Results" isn't a real interactive step */}
                  Step {currentStep + 1} of {steps.length -1} {/* Adjusted total steps */}
                </div>
              )}
            </div>
             {/* Show progress bar only when not processing */}
            {!isProcessing && currentStep < steps.length - 1 && (
              <div className="mt-4 overflow-hidden rounded-full bg-[#DDDDFB]/20">
                <div
                  className="h-2 rounded-full bg-[#1418EB] transition-all duration-300"
                  // Adjust progress calculation based on effective number of steps
                  style={{ width: `${((currentStep + 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            )}
          </div>

           {/* Show step indicators only when not processing */}
          {!isProcessing && (
            <div className="mb-6 flex flex-wrap gap-2">
              {/* Filter out the 'results' step from indicators if it's just processing */}
              {steps.filter(step => step.id !== 'results').map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center rounded-full px-3 py-1 text-sm ${
                    index === currentStep
                      ? "bg-[#1418EB] text-white" // Current step
                      : index < currentStep
                        ? "bg-[#DDDDFB]/20 text-white" // Completed step
                        : "bg-black/50 text-white/40" // Future step
                  }`}
                >
                  {index < currentStep && <CheckCircle className="mr-1 h-3 w-3" />}
                  {step.title}
                </div>
              ))}
            </div>
          )}

          <Card className="border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md">
            <CardHeader>
              {/* Use dynamic cardTitle and cardDescription */}
              <CardTitle className="text-white">{cardTitle}</CardTitle>
              <CardDescription className="text-white/70">
                {cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                // Processing Indicator UI
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative mb-4">
                    <div className="h-16 w-16 rounded-full border-4 border-[#DDDDFB]/20 border-t-[#00EDBE] animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full bg-[#00EDBE]/20 animate-pulse"></div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">Processing Your Data</h3>
                  <p className="text-center text-white/70 max-w-md">
                    Our AI is analyzing your profile and assessment results to generate personalized career recommendations...
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {/* Example pulsing tags */}
                    <div className="px-4 py-2 rounded-full bg-black/50 border border-[#DDDDFB]/20 text-white/60 text-sm animate-pulse">
                      Analyzing Skills
                    </div>
                    <div className="px-4 py-2 rounded-full bg-black/50 border border-[#DDDDFB]/20 text-white/60 text-sm animate-pulse delay-300">
                      Matching Career Paths
                    </div>
                    <div className="px-4 py-2 rounded-full bg-black/50 border border-[#DDDDFB]/20 text-white/60 text-sm animate-pulse delay-700">
                      Generating Insights
                    </div>
                  </div>
                </div>
              ) : (
                // Render the current step's form component
                renderStep()
              )}
            </CardContent>
          </Card>

          {/* Show Back button only when not processing and not on the first step */}
          {!isProcessing && currentStep > 0 && (
            <div className="mt-6 flex justify-start"> {/* Changed justify-between to justify-start */}
              <Button
                variant="outline"
                onClick={handleBack}
                className="border-[#DDDDFB]/20 text-white hover:bg-[#DDDDFB]/10"
                // Disable button if already processing (safety check)
                disabled={isProcessing}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {/* Removed the implicit Next button here; submission is handled within each form */}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}