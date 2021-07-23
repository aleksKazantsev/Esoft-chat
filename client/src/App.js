import {observer} from 'mobx-react-lite'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CssBaseline  } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'

import AppToolbar from './components/AppToolbar'
import theme from './store/theme'
import './App.css'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Chat from './pages/Chat'
import Transition from './pages/Transition'


const App = observer(() => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme.getMuiTheme}>
        <CssBaseline />
        <div className="App">
          <AppToolbar />
          <Switch>
            <Route path={'/'} exact component={Chat} />
            <Route path={'/login'}  component={Login} />
            <Route path={'/registration'} component={Registration} />
            <Route path={'/test'} component={Transition} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
})

export default App
