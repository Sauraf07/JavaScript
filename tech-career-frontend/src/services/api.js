const BASE = '/api'

const headers = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
})

const req = async (method, path, body, token) => {
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: headers(token),
      ...(body ? { body: JSON.stringify(body) } : {})
    })
    
    if (!res.ok) {
      let errorMsg = `HTTP ${res.status}: Request failed`
      try {
        const data = await res.json()
        errorMsg = data.message || errorMsg
      } catch {
        errorMsg = res.statusText || errorMsg
      }
      throw new Error(errorMsg)
    }
    
    const data = await res.json()
    return data
  } catch (error) {
    console.error(`API Error [${method} ${path}]:`, error)
    throw error
  }
}

// AUTH
export const register = (name, email, password) =>
  req('POST', '/auth/register', { name, email, password })

export const login = (email, password) =>
  req('POST', '/auth/login', { email, password })

// PROFILE
export const createProfile = (user_id, course, semester, token) =>
  req('POST', '/profile/create', { user_id, course, semester }, token)

export const getProfile = (userId, token) =>
  req('GET', `/profile/${userId}`, null, token)

// SUBJECTS
export const addSubject = (user_id, subject_name, token) =>
  req('POST', '/subjects/add', { user_id, subject_name }, token)

export const getSubjects = (userId, token) =>
  req('GET', `/subjects/${userId}`, null, token)

export const filterImportantSubjects = (user_id, token) =>
  req('POST', '/subjects/filter-important', { user_id }, token)

// CAREER
export const getCareerPaths = () =>
  req('GET', '/career/paths')

export const selectCareer = (user_id, career_field, token) =>
  req('POST', '/career/select', { user_id, career_field }, token)

// ROADMAP
export const generateRoadmap = (user_id, career_field, token) =>
  req('POST', '/roadmap/generate', { user_id, career_field }, token)

export const getRoadmap = (userId, token) =>
  req('GET', `/roadmap/${userId}`, null, token)

// TASKS
export const generateTasks = (user_id, token) =>
  req('POST', '/tasks/generate', { user_id }, token)

export const getTasks = (userId, token) =>
  req('GET', `/tasks/${userId}`, null, token)

export const completeTask = (task_id, user_id, token) =>
  req('POST', '/tasks/complete', { task_id, user_id }, token)
