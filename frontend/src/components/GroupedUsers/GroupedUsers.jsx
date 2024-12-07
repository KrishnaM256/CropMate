import React, { useState, useEffect } from 'react'
import GroupCard from '../common/cards/GroupCard/GroupCard'
import './GroupedUsers.css'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid4 } from 'uuid'
import { toast } from 'react-toastify'
import {
  deleteGroup,
  removeFromGroup,
  editGroupName,
} from '../../redux/features/group/groupSlice'
import { FaRegPaperPlane, FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline, MdOutlineSaveAs } from 'react-icons/md'

const GroupedUsers = () => {
  const dispatch = useDispatch()
  const groups = useSelector((state) => state.group)
  const groupList = Object.values(groups)

  const [selectedGroup, setSelectedGroup] = useState(groupList[0])
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const updatedGroup = groupList.find(
      (group) => group.id === selectedGroup?.id
    )
    setSelectedGroup(updatedGroup)
  }, [groups, selectedGroup?.id])

  const handleClick = (id) => {
    const group = groupList.find((group) => group.id === id)
    setSelectedGroup(group)
  }

  const handleDeleteGroup = () => {
    try {
      dispatch(deleteGroup({ groupId: selectedGroup.id }))
      toast.success(`Group ${selectedGroup.name} deleted successfully`)
      const remainingGroups = groupList.filter(
        (group) => group.id !== selectedGroup.id
      )
      setSelectedGroup(remainingGroups[0] || null)
    } catch (error) {
      toast.error('Failed to delete the group')
    }
  }

  const handleRemoveFromGroup = (mId) => {
    try {
      const member = selectedGroup.members.find((member) => member.id === mId)
      if (member) {
        dispatch(removeFromGroup({ groupId: selectedGroup.id, memberId: mId }))
        const updatedMembers = selectedGroup.members.filter(
          (member) => member.id !== mId
        )
        setSelectedGroup((prevGroup) => ({
          ...prevGroup,
          members: updatedMembers,
        }))
        toast.success(
          `Successfully removed ${member.name} from ${selectedGroup.name}`
        )
      }
    } catch (error) {
      toast.error('Failed to remove from group')
    }
  }

  const handleEditGroupName = () => {
    if (editable) {
      try {
        dispatch(
          editGroupName({
            groupId: selectedGroup.id,
            newName: selectedGroup.name,
          })
        )
        toast.success('Group name updated successfully')
      } catch (error) {
        toast.error('Failed to update group name')
      }
    }
    setEditable(!editable)
  }

  const handleGroupNameChange = (e) => {
    setSelectedGroup({
      ...selectedGroup,
      name: e.target.value,
    })
  }

  return (
    <div className="pageContainer">
      <h2 className="h2">Grouped Network</h2>
      <button className="border respContainer">
        <HiOutlineUserGroup className="icon" />
        Groups
      </button>
      <div className="cardsContainer">
        <div className="groups">
          <h4>Groups</h4>
          <div className="grpContainer">
            {groupList?.map((gl) => (
              <div
                className="grp"
                key={uuid4()}
                onClick={() => handleClick(gl.id)}
              >
                {gl.name}
              </div>
            ))}
          </div>
        </div>
        {selectedGroup && (
          <div className="grpCards">
            <div className="container">
              {!editable ? (
                <h5>{selectedGroup.name}</h5>
              ) : (
                <input
                  className="h5"
                  type="text"
                  value={selectedGroup.name}
                  onChange={handleGroupNameChange}
                />
              )}
              <div>
                <button
                  type="button"
                  className="border"
                  style={{ border: 'none' }}
                >
                  <FaRegPaperPlane />
                </button>
                <button
                  type="button"
                  className="border"
                  style={{ border: 'none' }}
                  onClick={handleEditGroupName}
                >
                  {editable ? (
                    <MdOutlineSaveAs style={{ fontSize: '1.3rem' }} />
                  ) : (
                    <FaRegEdit style={{ fontSize: '1.3rem' }} />
                  )}
                </button>
                <button
                  type="button"
                  className="border"
                  style={{ border: 'none' }}
                  onClick={handleDeleteGroup}
                >
                  <MdDeleteOutline style={{ fontSize: '1.3rem' }} />
                </button>
              </div>
            </div>
            {selectedGroup.members?.map((member) => (
              <GroupCard
                key={uuid4()}
                member={member}
                handleRemoveFromGroup={handleRemoveFromGroup}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupedUsers
