import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet,AppRegistry,TouchableOpacity ,Image, Text ,localStorage, AsyncStorage} from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import {
  
  Linking,
  Dimensions,
  LayoutAnimation,
  
  StatusBar,
  
} from 'react-native';
import decode from 'jwt-decode'; // 2.2.0 

import { Navigator } from 'react-native-deprecated-custom-components'; // 0.1.2


export default class App extends Component {
  constructor(props) {
    super(props);
    
    
  }
  
 

  render() {
    
    return (
        <Navigator initialRoute = {{id : "Login"}}
        renderScene = {this.navigatorRenderScene}/>
    );
  }
  navigatorRenderScene(route,navigator){
    switch(route.id){
      case"Login": return (<Login navigator ={navigator}/>);
      case"Options": return (<Options navigator ={navigator}/>);
      case"Qr" : return (<Qr navigator ={navigator}/>);
      case"Withdraw" : return (<Withdraw navigator ={navigator}/>);
      case"Deposit2" : return (<Deposit2 navigator ={navigator}/>);
      case"Withdraw2" : return (<Withdraw2 navigator ={navigator}/>);
      case"Pincode" : return (<Pincode navigator ={navigator}/>);


    }
  }
}

export class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
    //this.onLogin = this.onLogin.bind(this)
    //this.loginUser = this.loginUser.bind(this) 
  }
  
  loginUser(username,password) {
  return () => {
    
             console.log('AUTHENTICATION ERROR!!2');

    fetch('https://bd3483ab.ngrok.io/api/v1/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                email: username,
                password: password
            })
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
         console.log('AUTHENTICATION ERROR!!');
        Alert.alert("Invaild username or password")
        } else {
          console.log('SUCCESS!!');
          response.json().then(data => {
            console.log(data);
            this.props.navigator.push({id : "Options"})
            
          });
        }
      });

  };

}
//   onLogin() {
//    // const { username, password } = this.state;
//  // Alert.alert('Credentials' ${this.state.username} + ${password});
//     this.Auth.login(this.state.username,this.state.password)
//     .then(res =>{
//       this.props.navigator.push({id : "Options"});

    
//     })
//     .catch(err =>{
//         Alert.alert(err);
//     })
//       Alert.alert('Credentials', `${this.state.username} + ${this.state.password}`);

    
//   }

  render() {
    
    return (
      <View style={styles.container}>
        <Image source={require("./assets/green logo.png")}
          style={styles.logo}/>

        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.loginUser(this.state.username,this.state.password)}

        />
        <Button
          title={'New user? Register'}
          style={styles.register}
          

        />
      </View>
    );
  }
}

export class Options extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  

   render() {
    
    return (
      
      <View style={styles.container}>
      <Image source={require("./assets/green logo.png")}
          style={styles.upperlogo}/>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigator.push({id: "Qr"})}>
          <Image source={require("./assets/1.png")}
          style={styles.stretch}/>
          <Text style={styles.textcenter}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigator.push({id: "Qr"})}>
          <Image source={require("./assets/2.png")}
          style={styles.stretch}/>
          <Text style={styles.textcenter}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
          <Image source={require("./assets/3.png")}
          style={styles.stretch}/>
          <Text style={styles.textcenter}>Transfer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}





export class Withdraw2 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      amount: 0
    };
   

  }
  
  deposit(){
    
                 this.props.navigator.push({id : "Pincode"})



  
  }
      

  postDeposit(id,amount) {
  
  

    fetch('https://bd3483ab.ngrok.io/api/v1/withdraws', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                operation_date: "3/8/2018",
                from_user_id: 1,
                to_hajji_id: id,
                amount: amount
            })
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
         console.log('AUTHENTICATION ERROR!!');
        Alert.alert("Invaild username or password")
        } else {
          console.log('SUCCESS!!');
          response.json().then(data => {
            console.log(data);
          });
        }
      });

  

}

  addBalance(amount) {
 
    
AsyncStorage.getItem('id', (err, result) => {

      console.log(result);



    
    fetch(`https://bd3483ab.ngrok.io/api/v1/hajji/hajjis/${result}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                balance: amount,
            })
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
        Alert.alert("Invaild username or password")
        } else {
          console.log('SUCCESS!!');
          response.json().then(data => {
            this.props.navigator.push({id : "Pincode"})
            console.log(data);
            
            
          });
        }
      });
      });

  

}

  render() {
    
    return (
      <View style={styles.container}>
        <Image source={require("./assets/green logo.png")}
          style={styles.logo}/>

        <TextInput
          value={this.state.amount}
          onChangeText={(amount) => this.setState({ amount })}
          placeholder={'Amount'}
          style={styles.input}
        />
        
        
        <Button
          title={'Done'}
          style={styles.input}
          onPress={this.deposit}

        />
        <Button
          title={'if you want to Back?'}
          style={styles.register}
          

        />
      </View>
    );
  }
}


export class Pincode extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pin: 0
    };
   

  }
  
  deposit(){
    
     Alert.alert("Withdraw done successfully");
  }
      


  

  render() {
    
    return (
      <View style={styles.container}>
        <Image source={require("./assets/green logo.png")}
          style={styles.logo}/>

        <TextInput
          value={this.state.pin}
          onChangeText={(pin) => this.setState({ pin })}
          placeholder={'Pin'}
          style={styles.input}
        />
        
        
        <Button
          title={'Done'}
          style={styles.input}
          onPress={this.deposit}

        />
        <Button
          title={'if you want to Exit?'}
          style={styles.register}
          

        />
      </View>
    );
  }
}



export class Deposit2 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      amount: 0
    };
   

  }
  
  deposit(amount){
    
     AsyncStorage.getItem('balance', (err, result) => {
       this.addBalance(amount);  });

       AsyncStorage.getItem('id', (err, result) => {
      this.postDeposit(result, amount);

      console.log(result);


    });


  
  }
      

  postDeposit(id,amount) {
  
  

    fetch('https://bd3483ab.ngrok.io/api/v1/deposits', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                operation_date: "3/8/2018",
                from_user_id: 1,
                to_hajji_id: id,
                amount: amount
            })
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
         console.log('AUTHENTICATION ERROR!!');
        Alert.alert("Invaild username or password")
        } else {
          console.log('SUCCESS!!');
          response.json().then(data => {
            console.log(data);
          });
        }
      });

  

}

  addBalance(amount) {
 
    
AsyncStorage.getItem('id', (err, result) => {

      console.log(result);



    
    fetch(`https://bd3483ab.ngrok.io/api/v1/hajji/hajjis/${result}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                balance: amount,
            })
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
        Alert.alert("Invaild username or password")
        } else {
          console.log('SUCCESS!!');
          response.json().then(data => {

            console.log(data);
            
            
          });
        }
      });
      });

  

}

  render() {
    
    return (
      <View style={styles.container}>
        <Image source={require("./assets/green logo.png")}
          style={styles.logo}/>

        <TextInput
          value={this.state.amount}
          onChangeText={(amount) => this.setState({ amount })}
          placeholder={'Amount'}
          style={styles.input}
        />
        
        
        <Button
          title={'Done'}
          style={styles.input}
          onPress={this.deposit(this.state.amount)}

        />
        <Button
          title={'if you want to Back?'}
          style={styles.register}
          

        />
      </View>
    );
  }
}

export class Qr extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
          if (result.data !== this.state.lastScannedUrl) {
        //    LayoutAnimation.spring();
          this.setState({ lastScannedUrl: result.data });
                       console.log('hAJJ');

   
    
   
    fetch(`https://bd3483ab.ngrok.io/api/v1/hajji/HajjiByQR/${result.data}`, {
        
        
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
        Alert.alert("nO hAJJI")
        } else {
          console.log('SUCCESS2!!');
          response.json().then(data => {
            console.log(data);
            AsyncStorage.setItem('hajji', JSON.stringify(data), () => {
                            

                AsyncStorage.setItem('balance', JSON.stringify(data[0].balance), () => { 
                     
          });
         
           AsyncStorage.setItem('id', JSON.stringify(data[0].id), () => {   
                           //console.log(data[0].id);
                   
          });
              
              });
          

            this.props.navigator.push({id : "Deposit2"})
            
          });
        }
      });

  }
    //   LayoutAnimation.spring();
    //   this.setState({ lastScannedUrl: result.data });

    //   console.log(result.data);
    // }
  };

  render() {
    return (
      <View style={styles.container2}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}


export class Withdraw extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
          if (result.data !== this.state.lastScannedUrl) {
        //    LayoutAnimation.spring();
          this.setState({ lastScannedUrl: result.data });
                       console.log('hAJJ');

   
    
   
    fetch(`https://bd3483ab.ngrok.io/api/v1/hajji/HajjiByQR/${result.data}`, {
        
        
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
        Alert.alert("nO hAJJI")
        } else {
          console.log('SUCCESS2!!');
          response.json().then(data => {
            console.log(data);
            AsyncStorage.setItem('hajji', JSON.stringify(data), () => {
                            

                AsyncStorage.setItem('balance', JSON.stringify(data[0].balance), () => { 
                     
          });
         
           AsyncStorage.setItem('id', JSON.stringify(data[0].id), () => {   
                           //console.log(data[0].id);
                   
          });
              
              });
          

            this.props.navigator.push({id : "Withdraw2"})
            
          });
        }
      });

  }
    //   LayoutAnimation.spring();
    //   this.setState({ lastScannedUrl: result.data });

    //   console.log(result.data);
    // }
  };

  render() {
    return (
      <View style={styles.container2}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  upperlogo:{
    width:108,
    height:40,
    marginTop: -60,
    marginBottom: 60,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    borderRadius:10,
  },
  stretch: {
    width: 90,
    height:90,
    borderRadius:10,      
    margin:20,

  },
  logo: {
    width:162,
    height:60,
    marginTop: -80,
    marginBottom: 80,

  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  register:{
    marginTop: 80,
    marginBottom: -80,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
      textcenter:{
  textAlign: 'center',
  marginBottom:35
  },

});

