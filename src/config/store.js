import { configureStore } from '@reduxjs/toolkit'

import team from 'src/store/team'
import projects from 'src/store/projects'

export default configureStore({
  reducer: { team, projects },
})
