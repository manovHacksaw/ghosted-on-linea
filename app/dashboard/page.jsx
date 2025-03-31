"use client"

import { useEffect, useState } from "react"
import {
  Award,
  TrendingUp,
  LineChart,
  Zap,
  Target,
  GraduationCap,
  Lightbulb,
  BriefcaseBusiness,
  BookOpen,
  MapPin,
  Clock,
  Download,
  ArrowUpRight,
  ChevronRight,
  AlertCircle,
  Plus,
  ExternalLink,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"
import { WelcomePopup } from "./_components/WelcomePopup"

export default function DashboardPage() {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  // const [formData, setFormData] = useState(null)

  useEffect(() => {
    const fetchInsightsFromStorage = () => {
      try {
        // Try to get assessment data from localStorage
        const savedAssessmentData = localStorage.getItem("careerAssessmentData")
        const savedFormData = localStorage.getItem("careerFormData")

        // Use localStorage data
        const currentFormData = savedFormData ? JSON.parse(savedFormData) : null
        setFormData(currentFormData)

        let insightData = null

        if (savedAssessmentData) {
          try {
            const parsedData = JSON.parse(savedAssessmentData)

            // Parse the response if it's a string
            if (typeof parsedData.response === "string") {
              const jsonMatch = parsedData.response.match(/\{[\s\S]*\}/)
              if (jsonMatch) {
                insightData = JSON.parse(jsonMatch[0])
              }
            } else {
              insightData = parsedData.response
            }
          } catch (parseError) {
            console.error("Error parsing assessment data:", parseError)
          }
        }

        if (insightData) {
          setInsights({
            ...insightData,
            // Merge with form data for additional context
            formData: currentFormData,
          })
          setError(null)
        } else {
          // For demo purposes, if no data exists, create sample data
          const sampleData = generateSampleData()
          setInsights(sampleData)
        }
      } catch (error) {
        console.error("Error retrieving insights:", error)
        // Even if there's an error, use sample data instead of showing error
        const sampleData = generateSampleData()
        setInsights(sampleData)
      } finally {
        setLoading(false)
      }
    }

    fetchInsightsFromStorage()
  }, [])

  // Always generate sample data if insights is null
  useEffect(() => {
    if (!loading && !insights) {
      setInsights(generateSampleData())
    }
  }, [loading, insights])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black/[0.96] bg-grid-white/[0.02]">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full border-4 border-[#141BEB]/20 border-t-[#00EDBE] animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading your career insights...</p>
        </div>
      </div>
    )
  }

  // Use sample data instead of showing error
  if (!insights) {
    const sampleData = generateSampleData()
    return renderDashboard(sampleData)
  }

  return renderDashboard(insights)

  function renderDashboard(insightsData) {
    return (
      <div className="min-h-screen bg-black/[0.96] bg-grid-white/[0.02] relative overflow-hidden">
        {/* Ambient background with moving particles */}
        <WelcomePopup />
        <div className="h-full w-full absolute inset-0 z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#00EDBE"
          />
        </div>

        {/* Floating papers in background */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingPaper count={8} />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 relative z-10 pt-20">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Your Career Dashboard</h1>
            <p className="mt-2 text-gray-400">
              AI-powered analysis of your career assessment and personalized recommendations.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Match Score */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Career Match Score</CardTitle>
                <CardDescription className="text-gray-400">
                  Overall compatibility with recommended careers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 flex h-36 w-36 items-center justify-center rounded-full">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#2a2d3d" strokeWidth="10" />
                      {/* Progress arc */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeDasharray={`${2 * Math.PI * 45 * (insightsData.matchScore / 100)} ${
                          2 * Math.PI * 45 * (1 - insightsData.matchScore / 100)
                        }`}
                        strokeDashoffset={2 * Math.PI * 45 * 0.25}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#141BEB" />
                          <stop offset="100%" stopColor="#00EDBE" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-white">{insightsData.matchScore}%</span>
                      <span className="text-xs text-gray-400">Match Score</span>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-sm text-gray-400">
                    {insightsData.matchScore >= 80
                      ? "Excellent match with recommended career paths"
                      : insightsData.matchScore >= 60
                        ? "Good potential with some areas for improvement"
                        : "Consider exploring alternative career paths"}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full text-[#00EDBE] border-white/10 hover:bg-white/5">
                  View Score Details <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Top Career Recommendations */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Top Career Recommendations</CardTitle>
                  <CardDescription className="text-gray-400">
                    Based on your skills, interests, and assessment
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="hidden sm:flex h-8 text-xs text-[#00EDBE] border-white/10 hover:bg-white/5"
                >
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insightsData.topCareers.map((career, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">{career.title}</h3>
                        <Badge className="bg-[#141BEB] text-white">{career.matchPercentage}% Match</Badge>
                      </div>
                      <p className="mb-3 text-sm text-gray-400">{career.description}</p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {career.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="border-white/10 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {career.salaryRange && (
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4 text-[#00EDBE]" />
                            <span>{career.salaryRange}</span>
                          </div>
                        )}
                        {career.growthPotential && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-[#00EDBE]" />
                            <span>{career.growthPotential}</span>
                          </div>
                        )}
                        {career.marketDemand && (
                          <div className="flex items-center gap-1">
                            <LineChart className="h-4 w-4 text-[#00EDBE]" />
                            <span>{career.marketDemand}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="block sm:hidden">
                <Button variant="link" className="text-[#00EDBE] hover:text-[#00EDBE]/80 px-0">
                  View all career matches <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Skills Analysis */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Skills Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Your current skill levels and areas for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insightsData.skillsAnalysis.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{skill.name}</span>
                          {skill.category && (
                            <Badge variant="outline" className="border-white/10 text-gray-300">
                              {skill.category}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{skill.level}%</span>
                          {skill.importance && (
                            <Badge
                              variant="outline"
                              className={`border-white/10 ${
                                skill.importance === "High"
                                  ? "text-[#00EDBE]"
                                  : skill.importance === "Medium"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                              }`}
                            >
                              {skill.importance} Priority
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2 bg-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#141BEB] to-[#00EDBE] rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </Progress>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-[#00EDBE] border-white/10 hover:bg-white/5">
                  Develop Skills <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Strengths & Weaknesses */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Strengths & Areas for Growth</CardTitle>
                <CardDescription className="text-gray-400">Based on your assessment responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="strengths">
                  <TabsList className="grid w-full grid-cols-2 bg-white/5">
                    <TabsTrigger
                      value="strengths"
                      className="data-[state=active]:bg-[#141BEB] data-[state=active]:text-white"
                    >
                      Strengths
                    </TabsTrigger>
                    <TabsTrigger
                      value="weaknesses"
                      className="data-[state=active]:bg-[#141BEB] data-[state=active]:text-white"
                    >
                      Growth Areas
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="strengths" className="mt-4 space-y-3">
                    {insightsData.strengthsWeaknesses.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Zap className="mt-0.5 h-4 w-4 text-[#00EDBE]" />
                        <span className="text-sm text-gray-300">{strength}</span>
                      </div>
                    ))}
                    {insightsData.strengthsWeaknesses.marketCompetitiveness && (
                      <div className="mt-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-3">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <LineChart className="h-4 w-4 text-[#00EDBE]" />
                          <span>Market Competitiveness: {insightsData.strengthsWeaknesses.marketCompetitiveness}</span>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="weaknesses" className="mt-4 space-y-3">
                    {insightsData.strengthsWeaknesses.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Target className="mt-0.5 h-4 w-4 text-[#141BEB]" />
                        <span className="text-sm text-gray-300">{weakness}</span>
                      </div>
                    ))}
                    {insightsData.strengthsWeaknesses.improvementAreas && (
                      <div className="mt-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-3">
                        <h4 className="mb-2 text-sm font-medium text-white">Key Improvement Areas:</h4>
                        <ul className="space-y-2">
                          {insightsData.strengthsWeaknesses.improvementAreas.map((area, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                              <AlertCircle className="h-4 w-4 text-[#00EDBE]" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recommended Next Steps</CardTitle>
                  <CardDescription className="text-gray-400">
                    Actionable steps to progress toward your career goals
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="hidden sm:flex h-8 text-xs text-[#00EDBE] border-white/10 hover:bg-white/5"
                >
                  Create Plan <Plus className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {insightsData.nextSteps.map((step, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141BEB]/20">
                          {step.icon === "education" && <GraduationCap className="h-5 w-5 text-[#00EDBE]" />}
                          {step.icon === "skills" && <Lightbulb className="h-5 w-5 text-[#00EDBE]" />}
                          {step.icon === "network" && <BriefcaseBusiness className="h-5 w-5 text-[#00EDBE]" />}
                          {step.icon === "learning" && <BookOpen className="h-5 w-5 text-[#00EDBE]" />}
                          {step.icon === "experience" && <LineChart className="h-5 w-5 text-[#00EDBE]" />}
                          {step.icon === "location" && <MapPin className="h-5 w-5 text-[#00EDBE]" />}
                        </div>
                        {step.priority && (
                          <Badge
                            variant="outline"
                            className={`border-white/10 ${
                              step.priority === "high"
                                ? "text-[#00EDBE]"
                                : step.priority === "medium"
                                  ? "text-amber-400"
                                  : "text-emerald-400"
                            }`}
                          >
                            {step.priority.charAt(0).toUpperCase() + step.priority.slice(1)} Priority
                          </Badge>
                        )}
                      </div>
                      <h3 className="mb-2 text-base font-medium text-white">{step.title}</h3>
                      <p className="mb-3 text-sm text-gray-400">{step.description}</p>
                      {step.timeline && (
                        <div className="mb-3 flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="h-4 w-4 text-[#00EDBE]" />
                          <span>{step.timeline}</span>
                        </div>
                      )}
                      {step.resources && step.resources.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <h4 className="text-sm font-medium text-white">Resources:</h4>
                          <ul className="space-y-1">
                            {step.resources.map((resource, resourceIndex) => (
                              <li key={resourceIndex} className="flex items-center gap-2 text-sm text-gray-400">
                                <Download className="h-3 w-3 text-[#00EDBE]" />
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        className="mt-3 h-8 px-0 text-[#00EDBE] hover:text-[#00EDBE]/80 hover:bg-transparent"
                      >
                        Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            {insightsData.marketInsights && (
              <Card className="border-white/10 bg-white/5 backdrop-blur-sm md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-white">Market Insights</CardTitle>
                  <CardDescription className="text-gray-400">Industry trends and opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-medium text-white">
                        <TrendingUp className="h-5 w-5 text-[#00EDBE]" />
                        Current Trends
                      </h3>
                      <ul className="space-y-2">
                        {insightsData.marketInsights.trends.map((trend, index) => (
                          <li key={index} className="text-sm text-gray-400">
                            {trend}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-medium text-white">
                        <Lightbulb className="h-5 w-5 text-[#00EDBE]" />
                        Opportunities
                      </h3>
                      <ul className="space-y-2">
                        {insightsData.marketInsights.opportunities.map((opportunity, index) => (
                          <li key={index} className="text-sm text-gray-400">
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                      <h3 className="mb-3 flex items-center gap-2 text-lg font-medium text-white">
                        <AlertCircle className="h-5 w-5 text-[#141BEB]" />
                        Challenges
                      </h3>
                      <ul className="space-y-2">
                        {insightsData.marketInsights.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-gray-400">
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    )
  }
}

// localStorage
function generateSampleData() {
  return {
    matchScore: 78,
    topCareers: [
      {
        title: "UX/UI Designer",
        matchPercentage: 87,
        description: "Design user-centered digital experiences for websites and applications.",
        tags: ["Design", "User Research", "Prototyping"],
        salaryRange: "$75K - $120K",
        growthPotential: "High Growth",
        marketDemand: "Strong Demand",
      },
      {
        title: "Frontend Developer",
        matchPercentage: 82,
        description: "Build responsive and interactive user interfaces using modern web technologies.",
        tags: ["React", "JavaScript", "CSS"],
        salaryRange: "$80K - $130K",
        growthPotential: "Steady",
        marketDemand: "Very High",
      },
    ],
    skillsAnalysis: [
      {
        name: "JavaScript",
        level: 75,
        category: "Technical",
        importance: "High",
      },
      {
        name: "UI Design",
        level: 85,
        category: "Creative",
        importance: "High",
      },
      {
        name: "Communication",
        level: 70,
        category: "Soft Skill",
        importance: "Medium",
      },
      {
        name: "Data Analysis",
        level: 45,
        category: "Technical",
        importance: "Medium",
      },
      {
        name: "Project Management",
        level: 60,
        category: "Organizational",
        importance: "Low",
      },
    ],
    strengthsWeaknesses: {
      strengths: ["Creative problem solving", "Visual communication", "User empathy", "Rapid prototyping skills"],
      weaknesses: ["Backend development knowledge", "Statistical analysis", "Public speaking", "Time management"],
      marketCompetitiveness: "Above Average",
      improvementAreas: [
        "Learn fundamental backend concepts",
        "Take a course on data analysis",
        "Join Toastmasters to improve public speaking",
      ],
    },
    nextSteps: [
      {
        title: "Complete UX Certification",
        description: "Enroll in the Google UX Design Professional Certificate to enhance your design credentials.",
        icon: "education",
        timeline: "3-6 months",
        priority: "high",
        resources: ["Google UX Design Course", "Interaction Design Foundation Courses"],
      },
      {
        title: "Build Portfolio Projects",
        description: "Create 2-3 new case studies showcasing your design process for different types of applications.",
        icon: "skills",
        timeline: "2-4 months",
        priority: "high",
      },
      {
        title: "Expand Professional Network",
        description:
          "Attend design meetups and conferences to connect with industry professionals and potential mentors.",
        icon: "network",
        timeline: "Ongoing",
        priority: "medium",
        resources: ["Local UX/Design Meetups", "Design Conferences Calendar"],
      },
      {
        title: "Learn React Framework",
        description: "Strengthen your frontend development skills by mastering React to create interactive UIs.",
        icon: "learning",
        timeline: "2-3 months",
        priority: "medium",
        resources: ["React Documentation", "Frontend Masters Courses"],
      },
    ],
    marketInsights: {
      trends: [
        "Increased demand for designers with coding skills",
        "Growth in product design roles across industries",
        "Rise of design systems and component libraries",
        "Greater emphasis on accessibility and inclusive design",
      ],
      opportunities: [
        "Remote work positions expanding globally",
        "Fintech and healthcare sectors investing heavily in UX",
        "Freelance and contract opportunities growing",
        "Design leadership roles emerging in tech companies",
      ],
      challenges: [
        "Increasingly competitive job market",
        "Need for continuous skill development",
        "Balancing aesthetics with business requirements",
        "Keeping up with rapidly evolving design tools",
      ],
    },
  }
}
