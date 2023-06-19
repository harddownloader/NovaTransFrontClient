import React, { useState, MouseEvent } from 'react'

// mui
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// assets
import classes from './LangMenu.module.scss'

export const LangMenu = ({ isDarkStyle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        onClick={handleClick}
        className={`${isDarkStyle ? classes.dark_lang_menu_btn : classes.lang_menu_btn}`}
      >
        Язык
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} disabled>🇺🇦 Укр</MenuItem>
        <MenuItem onClick={handleClose} disabled>🇺🇸 Eng</MenuItem>
        <MenuItem onClick={handleClose}>🇷🇺 Рус</MenuItem>
      </Menu>
    </div>
  )
}
