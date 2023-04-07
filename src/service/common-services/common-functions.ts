class CommonFunctions{
  getFirstTwoLettersFromString = (fullName: string
    ) => {
      let words=fullName.split(' ');
      var returnText = '';
      words.map((word:any,index:any)=>{
        if(word.length>0){
          if(returnText.length<2){
            returnText +=  word.substring(0, 1);
          }
        }
      })
      return returnText;
    };


    stringToColor(string: string) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }
    
  stringAvatar(name: string) {
    let char = "";
    if(name && name!=null && name.length>0){
      name.split(' ').forEach(nm => {
        if (nm.length > 0 && char.length<2) {
          char += nm[0];
        }
      });
    }
    else{
      char='U';
      name='U';
    }
    
    return {
      sx: {
        bgcolor: this.stringToColor(name),
      },
        children: char,
      };
    }
}
export const commonFunctions = new CommonFunctions()