import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';

import AsideLink from './prefabs/AsideLink';

import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Logo from './prefabs/Logo';
import BookPreview from './prefabs/BookPreview';


ReactDOM.render(
  <React.StrictMode>
    <div className="main">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration" >
            <Registration />
          </Route>
          <Route path="*">
            <div className="leftcol">
              <div className="col__group">
                <Logo />
              </div>
              <div className="col__group">
                <AsideLink to="/recommendations" icon="./icons/recomendations.svg" text="Рекомендации" />
                <AsideLink to="/updates" icon="./icons/updates.svg" text="Лента обновлений" />
                <AsideLink to="/library" icon="./icons/library.svg" text="Библиотека" />
              </div>
            </div>
            <div className="centercol">
              <div className="centercol__content">
                <BookPreview />
              </div>
            </div>
            <div className="rightcol">
              <div className="rightcol__group">
                <div className="rightcol__user" style={{ background: "url(./userplaceholder.png)" }}>
                  <div className="rightcol__user__info">
                    <div className="rightcol__user--name">
                      Placeholder
                    </div>
                    <div className="rightcol__reading__stats">
                      <div className="rightcol__reading__stats--row">
                        Читатели: <span className="rightcol__reading__stats--bolder">10</span>
                      </div>
                      <div className="rightcol__reading__stats--row">
                        Читаемые: <span className="rightcol__reading__stats--bolder">10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col__group">
                <AsideLink to="/mybooks" icon="./icons/book.svg" text="Мои книги" />
                <AsideLink to="/subscriptions" icon="./icons/subscriptions.svg" text="Подписки" />
                <AsideLink to="/queue" icon="./icons/queue.svg" text="Буду читать" />
                <AsideLink to="/reading" icon="./icons/reading.svg" text="Читаю" />
                <AsideLink to="/settings" icon="./icons/settings.svg" text="Настройки" />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
