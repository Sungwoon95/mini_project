import './scss/main.scss'

import HeadTag from './components/Head'
import Header from './components/layout/Header'
import Nav from './components/layout/Nav'

const App = ({Component, pageProps}) => 
  {
    
    return(
    <>
      <HeadTag />
      <Header />
      <Nav />
      <div id='backdrop' />
      <Component {...pageProps}/>
    </>
    
  )
  }

App.getInitialProps = async ({ctx, Component}) => {
    const pageProps = await Component.getInitialProps?.(ctx)
    return {pageProps}
}

export default App;