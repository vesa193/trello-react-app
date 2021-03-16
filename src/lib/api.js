import axios from 'axios'

const API_KEY = 'f9ed59f4979deb75280b4e170f778992'
const SERVER_TOKEN = '692d0fe9fcd94adff3c2fde54537b03f7a7efcf91e8a46faff9287f0cff5da83'
const baseURL = `https://api.trello.com/1`


let axiosInstance
const createAxiosInstance = (token = '428r298jfw89u2rfoiwigfiegiet8u309goeopgfaa') => {
  const headers = token !== null ? {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // "Accept": "application/json",
  } : {
    "Content-Type": "application/json",
    // "Accept": "application/json",
  }
  axiosInstance = axios.create({
    headers,
    timeout: 30000,
  })

  return axiosInstance
}

// endpoints
const endpoint = {
  // TODO: add some of endpoints
  getUser: `/members/me/?key=${API_KEY}&token=${SERVER_TOKEN}`, // get
  getBoards: `/members/me/boards?key=${API_KEY}&token=${SERVER_TOKEN}`, // get
  getSingleBoard: `/members/me/boards?key=${API_KEY}&token=${SERVER_TOKEN}`, // get
}

// get single board of the account
const singleBoardEndpoint = (idBoard, boardName) => {
  return {
    getSingleBoard: `/boards/${idBoard}/actions?key=${API_KEY}&token=${SERVER_TOKEN}`, // get
    getSingleBoardLists: `/boards/${idBoard}/lists/open?key=${API_KEY}&token=${SERVER_TOKEN}`, // get
    getSingleBoardCards: `/boards/${idBoard}/cards?key=${API_KEY}&token=${SERVER_TOKEN}`, // get
    createBoard: `/boards/?key=${API_KEY}&token=${SERVER_TOKEN}&name=${boardName}`, // get
    deleteBoard: `/boards/${idBoard}?key=${API_KEY}&token=${SERVER_TOKEN}`, // delete
    editBoard: `/boards/${idBoard}?key=${API_KEY}&token=${SERVER_TOKEN}`, // put
  }
}

const singleListEndpoint = (idBoard, name, idList) => {
  return {
    createList: `/lists?key=${API_KEY}&token=${SERVER_TOKEN}&name=${name}&idBoard=${idBoard}`, // post
    editListTitle: `/lists/${idList}?key=${API_KEY}&token=${SERVER_TOKEN}`, // put
    deleteList: `/lists/${idList}/closed?key=${API_KEY}&token=${SERVER_TOKEN}`, // delete
  }
}

const singleCardEndpoint = (idCard, idList, payload) => {
  return {
    updateCard: `/cards/${idCard}?key=${API_KEY}&token=${SERVER_TOKEN}`, // put
    createCard: `/cards?key=${API_KEY}&token=${SERVER_TOKEN}&idList=${idList}`, // post
    deleteCard: `/cards/${idCard}?key=${API_KEY}&token=${SERVER_TOKEN}`, // delete
    moveCardToList: `/cards/${idCard}?key=${API_KEY}&token=${SERVER_TOKEN}` // put
    // moveCardToList: `/cards/${idCard}/${idList}?key=${API_KEY}&token=${SERVER_TOKEN}&value=${payload}`, // put
    // moveCardToList: `/cards/${idCard}/idList=${idList}&key=${API_KEY}&token=${SERVER_TOKEN}`, // put
    // moveCardToList: `/cards/${idCard}/actions?filter=updateCard:${idList}&key=${API_KEY}&token=${SERVER_TOKEN}`
    // https://api.trello.com/1/lists/{id}/idBoard?key=0471642aefef5fa1fa76530ce1ba4c85&token=9eb76d9a9d02b8dd40c2f3e5df18556c831d4d1fadbe2c45f8310e6c93b5c548&value=5abbe4b7ddc1b351ef961414
  }
}


export const getUserData = () => createAxiosInstance().get(`${baseURL}${endpoint.getUser}`).then(data => data).catch(err => console.log('error', err))
export const getBoardsData = () => createAxiosInstance().get(`${baseURL}${endpoint.getBoards}`).then(data => data).catch(err => console.log('error', err))
export const getSingleBoardData = (idBoard) => createAxiosInstance().get(`${baseURL}${singleBoardEndpoint(idBoard).getSingleBoard}`).then(data => data).catch(err => console.log('error', err))
export const getSingleBoardListsData = (idBoard) => createAxiosInstance().get(`${baseURL}${singleBoardEndpoint(idBoard).getSingleBoardLists}`).then(data => data).catch(err => console.log('error', err))
export const getSingleBoardCardsData = (idBoard) => createAxiosInstance().get(`${baseURL}${singleBoardEndpoint(idBoard).getSingleBoardCards}`).then(data => data).catch(err => console.log('error', err))
export const updateSingleCard = (idCard, payload) => createAxiosInstance().put(`${baseURL}${singleCardEndpoint(idCard).updateCard}`, payload).then(data => data).catch(err => console.log('error', err))
export const createSingleCard = (idList, payload) => createAxiosInstance().post(`${baseURL}${singleCardEndpoint(null, idList).createCard}`, payload).then(data => data).catch(err => console.log('error', err))
export const deleteSingleCard = (idCard) => createAxiosInstance().delete(`${baseURL}${singleCardEndpoint(idCard).deleteCard}`).then(data => data).catch(err => console.log('error', err))
export const moveSingleCard = (idCard, payload) => createAxiosInstance().put(`${baseURL}${singleCardEndpoint(idCard).moveCardToList}`, payload).then(data => data).catch(err => console.log('error', err))
export const createNewList = (idBoard, payload, position) => createAxiosInstance().post(`${baseURL}${singleListEndpoint(idBoard, payload).createList}`, position).then(data => data).catch(err => console.log('error', err))
export const editListTitle = (idList, payload) => createAxiosInstance().put(`${baseURL}${singleListEndpoint(null, null, idList).editListTitle}`, payload).then(data => data).catch(err => console.log('error', err))
export const deleteTheList = (idList, payload) => createAxiosInstance().put(`${baseURL}${singleListEndpoint(null, null, idList).deleteList}`, payload).then(data => data).catch(err => console.log('error', err))
export const createNewBoard = (boardName, payload) => createAxiosInstance().post(`${baseURL}${singleBoardEndpoint(null, boardName).createBoard}`, payload).then(data => data).catch(err => console.log('error', err))
export const deleteSingleBoard = (idBoard) => createAxiosInstance().delete(`${baseURL}${singleBoardEndpoint(idBoard).deleteBoard}`).then(data => data).catch(err => console.log('error', err))
export const editSingleBoard = (idBoard, payload) => createAxiosInstance().put(`${baseURL}${singleBoardEndpoint(idBoard).editBoard}`, payload).then(data => data).catch(err => console.log('error', err))
