import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { SimpleLibraryComponent } from './components/SimpleLibrary';

export const routes = <Layout>
    <Route exact path='/' component={ SimpleLibraryComponent } />
</Layout>;
