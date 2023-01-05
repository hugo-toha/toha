let deviceState = {
  isMobile: false,
  isTablet: false,
  isLaptop: false
}

function detectDeviceState () {
  if (window.innerWidth <= 425) {
    deviceState = {
      isMobile: true,
      isTablet: false,
      isLaptop: false
    }
  } else if (window.innerWidth <= 768) {
    deviceState = {
      isMobile: false,
      isTablet: true,
      isLaptop: false
    }
  } else {
    deviceState = {
      isMobile: false,
      isTablet: false,
      isLaptop: true
    }
  }
}

detectDeviceState()
window.addEventListener('resize', detectDeviceState)

// returns a copy of the device state
// so other parts of code can't override this.
export function getDeviceState () {
  return { ...deviceState }
}
