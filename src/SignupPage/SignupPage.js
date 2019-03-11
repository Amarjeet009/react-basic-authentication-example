import React from 'react';

import { userService } from '../_services';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        userService.logout();
        let options = [];
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            confpassword:'',
            country:'',
            submitted: false,
            loading: false,
            error: ''
        };
        userService.getCountry().then(function(countryArray) {
         
         console.log('resp======?',   countryArray);
         countryArray.map ((countryName, index) => ({
            id: index,
            name: countryName,
          }));
          countryArray.map(item =>
            // console.log('item=============',item)
            options.push({ label: item.name, value: item.iso3 }),
              );
          return countryArray;
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
  
 
    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
        let path = `login`;
        this.props.history.push(path);

      }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({
            value: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }
    // countryOpt= [];
    
    render() {
        const { firstname, lastname, username, password,confpassword,country, submitted, loading, error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Sign Up Page</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    <div className={'form-group' + (submitted && !firstname ? ' has-error' : '')}>
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" className="form-control" name="firstname" value={firstname} onChange={this.handleChange} />
                        {submitted && !firstname &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !lastname ? ' has-error' : '')}>
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={lastname} onChange={this.handleChange} />
                        {submitted && !lastname &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Email</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    
                    <div className={'form-group' + (submitted && !confpassword ? ' has-error' : '')}>
                    <label htmlFor="confpassword">Confirm Password</label>
                    <input type="password" className="form-control" name="confpassword" value={confpassword} onChange={this.handleChange} />
                    {submitted && !confpassword &&
                        <div className="help-block">Confirm Password is required</div>
                    }
                    </div>

                    <div className={'form-group' + (submitted && !country ? ' has-error' : '')}>
                    <label htmlFor="country">Country</label>
                    <select className="form-control" name="country" value={country}  onChange={this.handleChange}>
                     <option>india</option>
                     <option>China</option>
                     <option>USA</option>
                     </select>
                    {submitted && !country &&
                        <div className="help-block">country  is required</div>
                    }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Sign Up</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
                <button className="btn btn-primary" onClick={this.handleClick}>Login</button>
            </div>
        );
    }
}

export { SignupPage }; 