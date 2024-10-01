"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, persistor } from "./_store/store";
// import { makeStore, persistor } from "./_store/store";

import { changeTheme } from "./_store/features/theme/themeSlice";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // storeRef.current.dispatch(changeTheme(true))
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
