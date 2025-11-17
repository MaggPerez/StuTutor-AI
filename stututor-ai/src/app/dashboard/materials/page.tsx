"use client"

import { Upload, FileText, Download, Search, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const materials = [
  {
    id: 1,
    name: "Linear Algebra Chapter 5 Notes",
    type: "PDF",
    size: "2.4 MB",
    course: "Linear Algebra",
    uploadDate: "2 days ago",
    color: "blue",
  },
  {
    id: 2,
    name: "Quantum Physics Lab Report",
    type: "DOCX",
    size: "1.8 MB",
    course: "Quantum Physics",
    uploadDate: "5 days ago",
    color: "purple",
  },
  {
    id: 3,
    name: "Chemistry Formula Sheet",
    type: "PDF",
    size: "856 KB",
    course: "Organic Chemistry",
    uploadDate: "1 week ago",
    color: "green",
  },
  {
    id: 4,
    name: "Data Structures Lecture Slides",
    type: "PPTX",
    size: "5.2 MB",
    course: "Data Structures",
    uploadDate: "3 days ago",
    color: "orange",
  },
]

export default function MaterialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Materials</h1>
          <p className="text-muted-foreground">
            Upload, organize, and access your learning resources
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10.2 MB</div>
            <p className="text-xs text-muted-foreground">of 5 GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search materials..." className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>All Materials</CardTitle>
          <CardDescription>Your uploaded study resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {materials.map((material) => (
              <div
                key={material.id}
                className="flex items-center justify-between py-4 hover:bg-muted/50 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-${material.color}-100 dark:bg-${material.color}-900/20 flex items-center justify-center`}>
                    <FileText className={`h-5 w-5 text-${material.color}-500`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{material.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {material.course}
                      </Badge>
                      <span>•</span>
                      <span>{material.size}</span>
                      <span>•</span>
                      <span>{material.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Upload Study Materials</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button>Choose Files</Button>
        </CardContent>
      </Card>
    </div>
  )
}
