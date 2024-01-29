import React from 'react';
import {RealmProvider} from '@realm/react';
// Import your models


import {Users} from './models/UsersSchema';
export const AppWrapper = () => {
  return (
    <RealmProvider schema={[Users]}>
      <RestOfApp />
    </RealmProvider>
  );
};