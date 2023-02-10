import {FaGamepad} from 'react-icons/fa'
import {Component} from 'react'
import Cookies from 'js-cookie'
import FailureView from '../AuthenticationFailure'
import Load from '../Loader'
import Context from '../../Context'
import GamingVideoItem from '../GamingVideoItem'
import Navbar from '../Navbar'
import LeftBar from '../LeftBar'

import {
  GamesContainer,
  HeadContainer,
  Icon,
  GamesHead,
  GamesVideosContainer,
  HomeContainer,
  HomeBody,
} from './styledComponents'

const constantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Gaming extends Component {
  state = {gamingVideos: [], state: constantStates.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  successfulFetch = videos => {
    const updatedVideos = videos.map(each => ({
      id: each.id,
      thumbnailUrl: each.thumbnail_url,
      title: each.title,
      viewCount: each.view_count,
    }))
    this.setState({gamingVideos: updatedVideos, state: constantStates.success})
  }

  getGamingVideos = async () => {
    this.setState({state: constantStates.loading})
    const trendingVideosUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(trendingVideosUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.successfulFetch(data.videos)
    } else {
      this.setState({state: constantStates.failure})
    }
  }

  header = () => (
    <Context.Consumer>
      {value => {
        const {isDark} = value
        return (
          <HeadContainer isDark={isDark} data-testid="banner">
            <Icon isDark={isDark}>
              <FaGamepad />
            </Icon>
            <GamesHead>Gaming</GamesHead>
          </HeadContainer>
        )
      }}
    </Context.Consumer>
  )

  trendingVideos = () => {
    const {gamingVideos} = this.state
    return (
      <GamesVideosContainer>
        {gamingVideos.map(each => (
          <GamingVideoItem key={each.id} details={each} />
        ))}
      </GamesVideosContainer>
    )
  }

  VideosSectionView = () => {
    const {state} = this.state
    switch (state) {
      case constantStates.loading:
        return <Load />
      case constantStates.success:
        return this.trendingVideos()
      case constantStates.failure:
        return <FailureView retry={this.getGamingVideos} />
      default:
        return null
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {isDark} = value
          return (
            <HomeContainer isDark={isDark} data-testid="gaming">
              <Navbar />
              <HomeBody>
                <LeftBar />
                <GamesContainer isDark={isDark}>
                  {this.header()}
                  {this.VideosSectionView()}
                </GamesContainer>
              </HomeBody>
            </HomeContainer>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Gaming
