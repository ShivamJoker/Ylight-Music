import React, {useEffect} from "react";

const GoogleAuth = ()=>{
    useEffect(() => {
        
        window.gapi.load("client:auth2", () => {
            window.gapi.client
              .init({
                clientId:
                  "",
                scope: "email"
              })
              .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
              });
          });

    }, [])
}

export default GoogleAuth