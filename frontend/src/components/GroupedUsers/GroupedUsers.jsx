import React, { useState, useEffect } from 'react'
import GroupCard from '../common/cards/GroupCard/GroupCard'
import './GroupedUsers.css'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid4 } from 'uuid'
import { toast } from 'react-toastify'
import { FaRegPaperPlane, FaRegEdit } from 'react-icons/fa'
import { MdDeleteOutline, MdOutlineSaveAs } from 'react-icons/md'
import {
  useDeleteGroupMutation,
  useGetAllGroupsQuery,
  useRemoveMemberGroupMutation,
  useUpdateGroupNameMutation,
} from '../../redux/api/usersApiSlice'

const GroupedUsers = () => {
  const dispatch = useDispatch()
  const {
    data: groupList,
    refetch,
    isLoading,
    isError,
  } = useGetAllGroupsQuery()
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [editable, setEditable] = useState(false)
  const [removeMember] = useRemoveMemberGroupMutation()
  const [updateName] = useUpdateGroupNameMutation()
  const [deleteGroup] = useDeleteGroupMutation()
  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (groupList && groupList.length > 0) {
      setSelectedGroup(groupList[0]) // Select the first group only if data is available
    }
  }, [groupList])

  const handleClick = (id) => {
    const group = groupList.find((group) => group._id === id)
    setSelectedGroup(group)
  }

  const handleDeleteGroup = async (gId) => {
    try {
      const res = await deleteGroup({ groupId: gId }).unwrap()
      console.log(res)
      toast.success(`Group ${selectedGroup.name} deleted successfully`)
      const remainingGroups = groupList.filter(
        (group) => group._id !== selectedGroup._id
      )
      setSelectedGroup(remainingGroups[0] || null)
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete the group')
    }
    refetch()
  }

  const handleRemoveFromGroup = async (mId, gId) => {
    try {
      const member = selectedGroup.members.find(
        (member) => member.userId._id === mId
      )
      const group = groupList.find((g) => g._id === gId)
      const res = await removeMember({ memberId: mId, groupId: gId }).unwrap()
      console.log(member, group)
      toast.success(
        `Successfully removed ${member.userId.firstName} ${member.userId.middleName} ${member.userId.lastName} from ${group.name}`
      )
    } catch (error) {
      console.log(error)
      toast.error('Failed to remove from group')
    }
    refetch()
  }

  const handleEditGroupName = async () => {
    if (editable) {
      try {
        const res = await updateName({
          name: selectedGroup.name,
          groupId: selectedGroup._id,
        }).unwrap()
        console.log(res)
        toast.success('Group name updated successfully')
      } catch (error) {
        console.log(error)
        toast.error('Failed to update group name')
      }
    }
    refetch()

    setEditable(!editable)
  }

  const handleGroupNameChange = (e) => {
    setSelectedGroup({
      ...selectedGroup,
      name: e.target.value,
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading groups</div>
  }

  return (
    <div className="pageContainer">
      <h2 className="h2">Grouped Network</h2>
      {groupList.length == 0 ? (
        <p className="notFound">
          No groups found. Start by creating your first group!
        </p>
      ) : (
        <>
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
                    onClick={() => handleClick(gl._id)}
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
                      onClick={() => handleDeleteGroup(selectedGroup._id)}
                    >
                      <MdDeleteOutline style={{ fontSize: '1.3rem' }} />
                    </button>
                  </div>
                </div>
                <div className="cardsDiv">
                  {selectedGroup?.members?.map((member) => (
                    <GroupCard
                      key={uuid4()}
                      groupId={selectedGroup._id}
                      member={member.userId}
                      handleRemoveFromGroup={handleRemoveFromGroup}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default GroupedUsers
