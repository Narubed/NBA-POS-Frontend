// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import TreeItem from '@mui/lab/TreeItem'

// ** Configs Import
import themeConfig from '../../../../../configs/themeConfig'

// ** Custom Components Imports
import UserIcon from '../../../../../layouts/components/UserIcon'

// ** Utils
import { handleURLQueries } from '../../../../../@core/layouts/utils'

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: '100%',

  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  borderTopLeftRadius: 100,
  borderBottomLeftRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: 'opacity .25s ease-in-out',
  '&.active, &.active:hover': {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`
  },
  '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
    color: `${theme.palette.common.white} !important`
  }
}))

const MenuItemTextMetaWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }) => {
  // ** Hooks
  const router = useRouter()

  const isNavLinkActive = ({ item2 }) => {
    if (router.pathname === item2.path || handleURLQueries(router, item2.path)) {
      return true
    } else {
      return false
    }
  }

  return (
    <TreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}

      //   sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem
        nodeId={item.title}
        label={
          <MenuNavLink>
            <MenuItemTextMetaWrapper>
              <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item.title}</Typography>
              {/* <UserIcon icon={ArrowDropDownCircleIcon} /> */}
            </MenuItemTextMetaWrapper>
          </MenuNavLink>
        }
      >
        {item.groupActive.map((item2, index) => (
          <>
            <ListItem
              key={item2.title}
              disablePadding
              className='nav-link'
              disabled={item.disabled || false}
              sx={{
                mt: 1.5,
                px: '0 !important',
                borderTopRightRadius: 100,
                borderBottomRightRadius: 100
              }}
            >
              <Link passHref href={item2.path === undefined ? '/' : `${item2.path}`} key={item2.title}>
                <MenuNavLink
                  component={'a'}
                  className={isNavLinkActive({ item2 }) ? 'active' : ''}
                  {...(item2.openInNewTab ? { target: '_blank' } : null)}
                  onClick={e => {
                    if (item2.path === undefined) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                    if (navVisible) {
                      toggleNavVisibility()
                    }
                  }}
                  sx={{
                    pl: 5.5,
                    ...(item2.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' })
                  }}
                >
                  <ListItemIcon
                    sx={{
                      mr: 2.5,
                      color: 'text.primary',
                      transition: 'margin .25s ease-in-out'
                    }}
                  >
                    <UserIcon icon={item2.icon} />
                  </ListItemIcon>

                  <MenuItemTextMetaWrapper>
                    <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>{item2.title}</Typography>
                    {item2.badgeContent ? (
                      <Chip
                        label={item2.badgeContent}
                        color={item2.badgeColor || 'primary'}
                        sx={{
                          height: 20,
                          fontWeight: 500,
                          marginLeft: 1.25,
                          '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                        }}
                      />
                    ) : null}
                  </MenuItemTextMetaWrapper>
                </MenuNavLink>
              </Link>
            </ListItem>
          </>
        ))}
      </TreeItem>
    </TreeView>
  )
}

export default VerticalNavLink
