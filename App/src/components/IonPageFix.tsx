import { IonPage } from "@ionic/react";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export const IonPageFix: React.FC<{ path: string; className?: string }> = ({
  children,
  path,
}) => {
  const history = useHistory();
  const ionPageRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const e = ionPageRef.current;
    if (!e) return;

    if (history.location.pathname !== path) {
      // should hide
      e.classList.add("ion-page-hidden");
      return;
    }

    // should show
    e.classList.remove("ion-page-hidden");
    const realAdd = e.classList.add.bind(e.classList);
    const controlledAdd: typeof realAdd = (...tokens) => {
      tokens = tokens.filter((token) => token !== "ion-page-hidden");
      realAdd(...tokens);
    };
    e.classList.add = controlledAdd;
    return () => {
      if (e.classList.add === controlledAdd) {
        e.classList.add = realAdd;
      }
    };
  }, [history.location.pathname, ionPageRef, path]);

  if (!"original") {
    return <IonPage>{children}</IonPage>;
  }
  return <IonPage ref={ionPageRef}>{children}</IonPage>;
};

export default IonPageFix;
