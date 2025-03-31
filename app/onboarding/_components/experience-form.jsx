"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Plus, Trash2 } from "lucide-react"

// Removed type annotation from props
export function ExperienceForm({ onSubmit }) {
  // State for experience entries
  const [experiences, setExperiences] = useState([
    {
      title: "",
      company: "",
      location: "",
      startDate: "", // Format YYYY-MM-DD for type="date" input
      endDate: "",   // Format YYYY-MM-DD for type="date" input
      currentlyWorking: false,
      description: "",
    },
  ])
  // State to track if user has no experience
  const [noExperience, setNoExperience] = useState(false);

  // Removed type annotations from parameters: index, field, value
  const handleChange = (index, field, value) => {
    const updatedExperiences = [...experiences]
    // Handle checkbox boolean conversion correctly
    const finalValue = field === 'currentlyWorking' ? !!value : value;
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: finalValue }
    // If 'currentlyWorking' is checked, clear the end date
    if (field === 'currentlyWorking' && finalValue === true) {
        updatedExperiences[index].endDate = "";
    }
    setExperiences(updatedExperiences)
  }

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { // Add a new blank experience object
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ])
    // If adding experience, ensure 'noExperience' is false
    setNoExperience(false);
  }

  // Removed type annotation from parameter: index
  const handleRemoveExperience = (index) => {
    // Only allow removal if there's more than one experience entry
    if (experiences.length > 1) {
      const updatedExperiences = experiences.filter((_, i) => i !== index)
      setExperiences(updatedExperiences)
    }
  }

  // Removed type annotation from parameter: e
  const handleSubmit = (e) => {
    e.preventDefault()
    // Submit an empty array if 'noExperience' is checked, otherwise submit the experiences
    onSubmit({ experiences: noExperience ? [] : experiences })
  }

  // Handler for the "no experience" checkbox
  const handleNoExperienceChange = (checked) => {
    const isChecked = !!checked; // Ensure boolean value
    setNoExperience(isChecked);
    // If checked, reset experiences to a single blank entry (or empty array if preferred)
    // Resetting to one blank entry allows adding one if the checkbox is unchecked later.
    if (isChecked) {
      setExperiences([{
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      }]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Conditionally render experience blocks only if 'noExperience' is false */}
      {!noExperience && experiences.map((experience, index) => (
        <div key={index} className="rounded-lg border border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md p-4 transition-all duration-300 ease-in-out">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Experience #{index + 1}</h3>
            {/* Show remove button only if there's more than one experience entry */}
            {experiences.length > 1 && (
              <Button
                type="button" // Prevent form submission
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveExperience(index)}
                className="text-red-500 hover:bg-red-900/20 hover:text-red-400 p-1 rounded-full" // Adjusted styling
                aria-label={`Remove Experience #${index + 1}`} // Accessibility
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="space-y-4">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`} className="text-white">Job Title</Label>
              <Input
                id={`title-${index}`}
                placeholder="e.g. Software Engineer Intern"
                value={experience.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                required={!noExperience} // Required only if adding experience
                className="bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50 focus:ring-1 focus:ring-[#00EDBE] focus:border-[#00EDBE]"
              />
            </div>
            {/* Company and Location */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`} className="text-white">Company</Label>
                <Input
                  id={`company-${index}`}
                  placeholder="e.g. Tech Solutions LLC"
                  value={experience.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  required={!noExperience} // Required only if adding experience
                  className="bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50 focus:ring-1 focus:ring-[#00EDBE] focus:border-[#00EDBE]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`} className="text-white">Location (Optional)</Label>
                <Input
                  id={`location-${index}`}
                  placeholder="e.g. San Francisco, CA or Remote"
                  value={experience.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                  className="bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50 focus:ring-1 focus:ring-[#00EDBE] focus:border-[#00EDBE]"
                />
              </div>
            </div>
            {/* Start and End Dates */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`start-date-${index}`} className="text-white">Start Date</Label>
                <Input
                  id={`start-date-${index}`}
                  type="date" // Use date picker input
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  required={!noExperience} // Required only if adding experience
                  className="bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50 focus:ring-1 focus:ring-[#00EDBE] focus:border-[#00EDBE] appearance-none" // Added appearance-none for custom styling potential
                  // Add max={experience.endDate || new Date().toISOString().split("T")[0]} if needed
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${index}`} className="text-white">End Date</Label>
                <Input
                  id={`end-date-${index}`}
                  type="date" // Use date picker input
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  disabled={experience.currentlyWorking} // Disable if currently working
                  required={!experience.currentlyWorking && !noExperience} // Required if not currently working and adding experience
                  className="bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-1 focus:ring-[#00EDBE] focus:border-[#00EDBE] appearance-none" // Added styles
                  min={experience.startDate} // Prevent end date before start date
                />
              </div>
            </div>
            {/* Currently Working Checkbox */}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id={`current-${index}`}
                checked={experience.currentlyWorking}
                // Pass the checked state directly to handler
                onCheckedChange={(checked) => handleChange(index, "currentlyWorking", checked)}
                className="border-[#DDDDFB]/30 data-[state=checked]:bg-[#00EDBE] data-[state=checked]:border-[#00EDBE] text-white focus:ring-1 focus:ring-offset-0 focus:ring-offset-black focus:ring-[#00EDBE]" // Adjusted styles
              />
              <Label htmlFor={`current-${index}`} className="text-sm font-normal text-white cursor-pointer">
                I currently work here
              </Label>
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`} className="text-white">Description (Optional)</Label>
              <Textarea
                id={`description-${index}`}
                placeholder="Describe your responsibilities, achievements, and skills used (e.g., 'Developed feature X using React, resulting in Y% improvement...')"
                value={experience.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="min-h-[100px] bg-black/50 border-[#DDDDFB]/20 text-white placeholder:text-white/50 focus:ring-1 focus:ring-[#00EDBE] focus:border-[#00EDBE]"
              />
            </div>
          </div>
        </div>
      ))}

      {/* "Add Another Experience" Button - Show only if not 'noExperience' */}
      {!noExperience && (
        <Button
          type="button" // Prevent form submission
          variant="outline"
          onClick={handleAddExperience}
          className="w-full border-dashed border-[#DDDDFB]/20 text-white hover:bg-[#DDDDFB]/10 hover:border-[#DDDDFB]/40"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Another Experience
        </Button>
      )}

      {/* "No Experience" Checkbox */}
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="no-experience"
          checked={noExperience}
          onCheckedChange={handleNoExperienceChange} // Use dedicated handler
          className="border-[#DDDDFB]/30 data-[state=checked]:bg-[#00EDBE] data-[state=checked]:border-[#00EDBE] text-white focus:ring-1 focus:ring-offset-0 focus:ring-offset-black focus:ring-[#00EDBE]" // Adjusted styles
        />
        <Label htmlFor="no-experience" className="text-sm font-normal text-white cursor-pointer">
          I don't have professional work experience yet
        </Label>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full bg-[#1418EB] text-white hover:bg-[#1418EB]/80">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}