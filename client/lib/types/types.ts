export type DocumentType = 'course' | 'past' | 'lecture'

export interface Document {
  id: string
  title: string
  courseCode: string
  department: string
  level: string
  semester: string
  type: DocumentType
  fileSize: string
  date: string
}
