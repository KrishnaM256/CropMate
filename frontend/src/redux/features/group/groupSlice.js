import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = localStorage.getItem('groups')
  ? JSON.parse(localStorage.getItem('groups'))
  : {}

const groupSlice = createSlice({
  name: 'Group',
  initialState,
  reducers: {
    createGroup: (state, action) => {
      const { name, details } = action.payload
      const newGroupId = uuidv4()
      state[newGroupId] = {
        id: newGroupId,
        name,
        members: details ? [details] : [],
      }
      localStorage.setItem('groups', JSON.stringify(state))
    },
    addToGroup: (state, action) => {
      const { groupId, item } = action.payload

      if (state[groupId]) {
        const isMemberExist = state[groupId].members.some(
          (member) => member.id === item.id
        )

        if (!isMemberExist) {
          state[groupId].members.push(item)
          localStorage.setItem('groups', JSON.stringify(state))
        }
      }
    },
    removeFromGroup: (state, action) => {
      const { groupId, memberId } = action.payload

      if (state[groupId]) {
        state[groupId].members = state[groupId].members.filter(
          (member) => member.id !== memberId
        )
        localStorage.setItem('groups', JSON.stringify(state))
      }
    },
    deleteGroup: (state, action) => {
      const { groupId } = action.payload

      if (state[groupId]) {
        delete state[groupId]
        localStorage.setItem('groups', JSON.stringify(state))
      }
    },
    editGroupName: (state, action) => {
      const { groupId, newName } = action.payload

      if (state[groupId]) {
        state[groupId].name = newName
        localStorage.setItem('groups', JSON.stringify(state))
      }
    },
  },
})

export const {
  createGroup,
  addToGroup,
  removeFromGroup,
  deleteGroup,
  editGroupName,
} = groupSlice.actions

export default groupSlice.reducer
