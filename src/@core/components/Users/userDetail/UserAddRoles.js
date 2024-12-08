import React from 'react'
import StatsHorizontal from '../../StatsHorizontal'
import {  Col, Row } from 'reactstrap'
import useQueryGet from '../../../../customHook/useQueryGet'
import { AddRole } from '../../../../core/services/Paper'
import { Aperture, AtSign, Book, Briefcase, Clock, Command, Cpu, Edit, GitBranch, MoreVertical, Trash2, User, UserPlus } from 'react-feather'
const UserAddRoles = ({user}) => {

    const roleIcons = [
        <Aperture />,
        <Book/>,
        <Command/>,
        <Edit/>,
        <User/>,
        <GitBranch/>,
        <Clock/>,
        <Briefcase/>,
        <Cpu/>,
        <AtSign/>
      ]

    const { data , refetch } = useQueryGet(["getRolles"] , "/User/UserMannage?PageNumber=1&RowsOfPage=10")

    const addRole = async (status, roleId) => {
        const response = await AddRole(roleId, user.id, status)
        if(response.success == true) {
          toast.success(' عملیات با موفقیت انجام شد ')
          refetch()
          refetchData()
        }
      }

  return (
    <>
    <Row className='d-flex'>
      {data?.roles.map((role, index) => {
        return <Col className='cursor-pointer w-50' key={index} onClick={() => user.roles.map(role => role.id).includes(role.id) ? addRole(false, role.id) : addRole(true, role.id) }>
            <StatsHorizontal
              color={user?.roles.map(role => role.id).includes(role.id) ? 'success' : 'danger'}
              statTitle={role.roleName}
              icon={roleIcons[role.id - 1]}
            />
          </Col>
      })}
    </Row>
  </>
  )
}

export default UserAddRoles