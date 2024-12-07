export const addProfileToLocalStorage = (Profile) => {
  const favorites = getProfileFromLocalStorage()
  if (!favorites.some((p) => p._id === Profile._id)) {
    favorites.push(Profile)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

// Remove  Profile from a localStorage
export const removeProfileFromLocalStorage = (ProfileId) => {
  const profiles = getProfileFromLocalStorage()
  const updateFavorites = favorites.filter(
    (Profile) => Profile._id !== ProfileId
  )

  localStorage.setItem('favorites', JSON.stringify(updateFavorites))
}

// Retrive favorites from a localStorage
export const getProfileFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem('favorites')
  return favoritesJSON ? JSON.parse(favoritesJSON) : []
}
