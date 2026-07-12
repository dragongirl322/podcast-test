import { z } from 'zod'

export const CAREER_STAGES = [
  'high_school',
  'college_or_training',
  'early_career',
  'developing_career',
  'mid_career',
  'career_change',
  'generally_curious',
  'other',
]

export const AGE_RANGES = [
  'under_18',
  '18_20',
  '21_24',
  '25_29',
  '30_39',
  '40_49',
  '50_59',
  '60_plus',
]

export const listenerSignupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  careerStage: z.enum(CAREER_STAGES as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a career stage' }),
  }),
  suggestedJob: z.string().min(2, 'Please enter a job title').max(255),
  ageRange: z.enum(AGE_RANGES as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select an age range' }),
  }).optional(),
  interestExplanation: z.string().max(1000).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the consent checkbox' }),
  }),
  honeypot: z.string().optional(),
})

export type ListenerSignupInput = z.infer<typeof listenerSignupSchema>

export const guestLeadSchema = z.object({
  nominationType: z.enum(['self', 'referral']),
  jobTitle: z.string().min(2, 'Please enter a job title').max(255),
  description: z.string().min(10, 'Please describe what makes this job interesting').max(1000),
  name: z.string().max(255).optional(),
  email: z.string().email().optional().or(z.literal('')),
  linkedInUrl: z.string().url().optional().or(z.literal('')),
  relationship: z.string().max(255).optional(),
  permissionToContact: z.boolean(),
})

export type GuestLeadInput = z.infer<typeof guestLeadSchema>
