import React from 'react';
class CreditCardValidator extends React.Component{

  constructor(){
    super();
    this.state = {
      isValid: false,
      ccNumber:'',
      isSubmitted: false,
    }
  }

  allnumeric(inputtxt) {
      var numbers = /^[0-9]+$/;
      if(inputtxt.match(numbers))
        return true;
      else
        return false;
   } 



  validateCC(){

    let cc_num = this.state.ccNumber.replace(' ', ''); 

    if( !this.allnumeric( cc_num ) ){
      return false;
    }
    if( cc_num.length < 16 ){
      return false;
    }

    let cc_last = cc_num.slice(-1);
    let cc_rev  = cc_num.slice(0,-1).split("").reverse().join(""); 
    let sum     = 0;
    
    for( var i = 0; i < cc_rev.length; i++ ){
      var tmp = parseInt( cc_rev.charAt(i) );
      if( ( i % 2 ) == 0 )
        tmp = tmp * 2;
        if( tmp > 9 )
          tmp = tmp - 9;
      cc_rev = cc_rev.substr(0,i) + tmp + cc_rev.substr(i+1)
    }

    for( var i = 0; i < cc_rev.length; i++ ){
      sum = parseInt(cc_rev.charAt(i)) + sum
    }
    return( ( (sum + parseInt( cc_last )) % 10 == 0 ) ? true : false);
  }

  formSubmit( e ){
    e.preventDefault();

    this.setState({
      isSubmitted: true,
    });
    if ( !this.validateCC() )
      this.setState({
        isValid: false,
      });
    else
      this.setState({
        isValid: true,
      });
  }

  updateNumber( e ){
    this.setState({
      ccNumber: e.target.value,
    });
  }

  render(){
    return(
        <div
          id="content"
          className={ "" + 
            ( this.state.isValid ? " valid-card " : " invalid-card " ) + 
            ( this.state.isSubmitted ? " submitted " : " not-submitted " )
          }
        >
         <h1>Credit Card Validator</h1>
          <form onSubmit={this.formSubmit.bind(this)}>
            <input
             placeholder="Credit Card Number"
             onChange={this.updateNumber.bind(this)}
             id="card-number" 
             type="text"></input>
            <button className="btn btn-primary">
            Validate
            </button>
          </form>

         <div
          className={ "" + 
            ( this.state.isValid ? " valid-text" : " invalid-text" ) + 
            ( this.state.isSubmitted ? " submitted " : " not-submitted " )
          }
        >
         <h2 className="invalid-h2">NOT A VALID CREDIT CARD NUMBER</h2>
         <h2 className="valid-h2">A VALID CREDIT CARD NUMBER</h2> 
        </div>
      </div>
    );
  }

}

export default CreditCardValidator;
