'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Github, Linkedin, Mail } from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      title: "Engineers Without Borders Challenge",
      description: "Developing a mangrove erosion control and stabilising structure for the Barron River.",
      pdfUrl: "https://gammaploid.github.io/EWB_Challenge_Mangrove_Erosion_Control_System_and_Stabilising_Structure_for_The_Barron_River.pdf"
    },
    {
      title: "ML Board Game Prediction",
      description: "Utilising machine learning techniques to predict board game attributes.",
      pdfUrl: "https://gammaploid.github.io/Machine_Learning_For_Predicting_Boardgame_Attributes.pdf"
    },
    {
      title: "WasteID",
      description: "An innovative approach to waste management and identification, promoting sustainable practices.",
      pdfUrl: "https://gammaploid.github.io/WasteID.pdf"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <header className="fixed w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm z-10">
        <nav className="container mx-auto px-6 py-3">
          <ul className="flex justify-center space-x-4">
            {['Home', 'About', 'Projects'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors hover:text-green-400 ${
                    activeSection === item.toLowerCase() ? 'text-green-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">gammaploid</h1>
            <p className="text-xl mb-8">Innovating for a Better Tomorrow</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Computer Science and AI student passionate about science, developing and understanding artificial intelligent systems, and exploring diverse computing domains.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'Machine Learning', 'Web Development', 'Data Science'].map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section id="projects" className="min-h-screen py-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setSelectedProject(project)}>
                      View Project <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedProject.title}</h3>
              <Button variant="ghost" onClick={() => setSelectedProject(null)}>Close</Button>
            </div>
            <embed 
              src={selectedProject.pdfUrl} 
              type="application/pdf" 
              width="100%" 
              height="100%"
              className="flex-grow"
            />
          </div>
        </div>
      )}

      <footer className="bg-gray-900 py-6 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 gammaploid. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}