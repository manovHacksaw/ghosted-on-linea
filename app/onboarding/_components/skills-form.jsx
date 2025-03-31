"use client"

// Removed React import type

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

// Removed type annotation from props
export function SkillsForm({ onSubmit }) {
  const [skillInput, setSkillInput] = useState("")
  // Removed type annotation from state initialization
  const [skills, setSkills] = useState([]) // Initialize as empty array

  const handleAddSkill = () => {
    // Check if skillInput is not empty and if the skill (case-insensitive) doesn't already exist
    if (skillInput.trim() && !skills.some((s) => s.name.toLowerCase() === skillInput.trim().toLowerCase())) {
      // Add the new skill with a default proficiency (e.g., 3 for Advanced)
      setSkills([...skills, { name: skillInput.trim(), proficiency: 3 }])
      setSkillInput("") // Clear the input field
    } else if (skills.some((s) => s.name.toLowerCase() === skillInput.trim().toLowerCase())) {
      // Optional: Provide feedback if skill already exists
      console.log("Skill already added."); // Or show a toast/message
      setSkillInput("") // Clear input even if duplicate
    }
  }

  // Removed type annotation from event parameter 'e'
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault() // Prevent form submission on Enter key
      handleAddSkill()
    }
  }

  // Removed type annotation from parameter 'skillToRemove'
  const handleRemoveSkill = (skillToRemove) => {
    // Filter out the skill whose name matches skillToRemove
    setSkills(skills.filter((skill) => skill.name !== skillToRemove))
  }

  // Removed type annotations from parameters 'index' and 'value'
  const handleProficiencyChange = (index, value) => {
    const updatedSkills = [...skills]
    // Slider component usually returns an array, take the first element
    updatedSkills[index].proficiency = value[0]
    setSkills(updatedSkills)
  }

  // Removed type annotation from event parameter 'e'
  const handleSubmit = (e) => {
    e.preventDefault()
    // Pass the current skills array to the parent component
    onSubmit({ skills })
  }

  // Skill categories for suggestions remain the same
  const skillCategories = [
    {
      name: "Technical Skills",
      examples: ["Programming", "Data Analysis", "Web Development", "Machine Learning", "UI/UX Design", "Cloud Computing", "Cybersecurity"],
    },
    {
      name: "Soft Skills",
      examples: ["Communication", "Leadership", "Teamwork", "Problem Solving", "Time Management", "Critical Thinking", "Adaptability"],
    },
    {
      name: "Languages",
      examples: ["English", "Spanish", "French", "German", "Mandarin", "Hindi", "Japanese"],
    },
     {
      name: "Tools & Software",
      examples: ["Microsoft Excel", "Adobe Photoshop", "Figma", "Jira", "Salesforce", "Google Analytics", "Docker"],
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Input field for adding skills */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add a skill (e.g. Python, Leadership)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add skill on Enter key
            className="bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50"
          />
          <Button
            type="button" // Important: type="button" prevents form submission
            onClick={handleAddSkill}
            className="shrink-0 bg-[#1418EB] text-white hover:bg-[#1418EB]/80"
            aria-label="Add skill" // Accessibility improvement
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Display area for added skills */}
        <div className="rounded-lg border border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md p-4 min-h-[150px]"> {/* Added min-height */}
          <h3 className="mb-4 text-lg font-medium text-white">Your Skills</h3>
          {skills.length === 0 ? (
            <p className="text-sm text-white/60 italic">No skills added yet. Use the input above or click suggestions below.</p>
          ) : (
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="rounded-lg border border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md p-3 transition-shadow hover:shadow-md hover:shadow-[#1418EB]/10">
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-y-2"> {/* Added flex-wrap and gap-y */}
                    <div className="flex items-center gap-2">
                      {/* Display skill name */}
                      <Badge className="bg-[#00EDBE] text-black hover:bg-[#00EDBE]/90 font-medium">{skill.name}</Badge>
                      {/* Remove skill button */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon" // Changed size for better click area
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="h-6 w-6 p-0 text-white/60 hover:bg-red-900/50 hover:text-red-400"
                         aria-label={`Remove ${skill.name} skill`} // Accessibility
                      >
                        <X className="h-3.5 w-3.5" /> {/* Slightly larger icon */}
                      </Button>
                    </div>
                    {/* Display proficiency level text */}
                    <span className="text-xs sm:text-sm text-white/80 font-medium"> {/* Responsive text size */}
                      {["", "Beginner", "Intermediate", "Advanced", "Expert", "Master"][skill.proficiency]}
                    </span>
                  </div>
                  {/* Proficiency slider */}
                  <div className="px-1 sm:px-2"> {/* Responsive padding */}
                    <Label htmlFor={`slider-${index}`} className="sr-only">Proficiency Level for {skill.name}</Label> {/* Better accessibility */}
                    <Slider
                      id={`slider-${index}`} // Link label to slider
                      value={[skill.proficiency]} // Slider expects an array
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => handleProficiencyChange(index, value)}
                      className="py-2 [&>span:first-child]:h-1.5 [&>span>span]:bg-[#00EDBE] [&>span>span]:h-1.5 [&>span>span]:w-1.5" // Custom slider styles
                      aria-valuetext={["", "Beginner", "Intermediate", "Advanced", "Expert", "Master"][skill.proficiency]} // Accessibility
                    />
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>Beginner</span>
                      <span>Master</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Suggested skills section */}
        <div className="rounded-lg border border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md p-4">
          <h3 className="mb-4 text-lg font-medium text-white">Suggested Skills</h3>
          <p className="text-sm text-white/60 mb-4">Click a suggestion to add it to the input field above.</p>
          <div className="space-y-4">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="mb-2 text-sm font-semibold text-white/90">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, exampleIndex) => (
                    // Make badge clickable to populate the input field
                    <Badge
                      key={exampleIndex}
                      variant="outline"
                      className="cursor-pointer border-[#DDDDFB]/30 text-white/80 hover:bg-[#DDDDFB]/10 hover:border-[#DDDDFB]/50 transition-colors"
                      onClick={() => {
                        // Set the input field value and optionally focus it
                        setSkillInput(example);
                         // Optional: focus the input field after clicking suggestion
                         // document.querySelector('input[placeholder^="Add a skill"]').focus();
                      }}
                      // Prevent adding duplicate suggestions directly if they are already in the list
                       disabled={skills.some(s => s.name.toLowerCase() === example.toLowerCase())}
                       // Add visual indication for disabled (already added) suggestions
                       style={{
                         opacity: skills.some(s => s.name.toLowerCase() === example.toLowerCase()) ? 0.5 : 1,
                         cursor: skills.some(s => s.name.toLowerCase() === example.toLowerCase()) ? 'not-allowed' : 'pointer'
                       }}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <Button type="submit" className="w-full bg-[#1418EB] text-white hover:bg-[#1418EB]/80">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}