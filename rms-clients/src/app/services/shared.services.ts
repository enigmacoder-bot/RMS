import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class SharedServices{

    randomizeUsername(email:string){
    let username = email.split('@')[0];
    let usernameArray = username.split('');
    for (let i = usernameArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [usernameArray[i], usernameArray[j]] = [usernameArray[j], usernameArray[i]];
    }
    return usernameArray.join('');
    }

    // convertBufferToBase64(buffer: Uint8Array): string {
    //     let binary = '';
    //     const len = buffer.byteLength;
    //     for (let i = 0; i < len; i++) {
    //       binary += String.fromCharCode(buffer[i]);
    //     }
    //     return window.btoa(binary); // Convert binary string to base64
    //   }

      convertBinaryToBase64(binaryData: ArrayBuffer): string {
        let binary = '';
        const bytes = new Uint8Array(binaryData);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary); // Convert binary to base64
      }


}