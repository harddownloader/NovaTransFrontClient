import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import classes from './LangMenu.module.scss'

export default function LangMenu({ isDarkStyle }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <MenuItem onClick={handleClose}>🇷🇺 Рус</MenuItem>
        <MenuItem onClick={handleClose} disabled>🇺🇦 Укр</MenuItem>
        <MenuItem onClick={handleClose} disabled>🇺🇸 Eng</MenuItem>
      </Menu>
    </div>
  )
}
