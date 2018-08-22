import React from 'react';

const creatAdvertisement = () => {

        return (
            <div>
            <h1>3</h1>
            <form>
                <select name="rentingway"
                        placeholder="rentingway"
                        value={this.state.rentingway}
                        onChange={e => this.change(e)}>
                    <option value="sublet">sublet</option>
                    <option value="entirerent">entire renting</option>
                </select>
                <br/>
                <select name="city"
                        placeholder="city"
                        value={this.state.city}
                        onChange={e => this.change(e)}>
                    <option value="Sydeny">Sydeny</option>
                    <option value="Melbourne">Melbourne</option>
                </select>
                <br />
                <input
                    name="suburb"
                    placeholder="suburb"
                    value={this.state.suburb}
                    onChange={e => this.change(e)}
                />
                <br />
                <input
                    name="contactDetail"
                    placeholder="contactDetail"
                    value={this.state.contactDetail}
                    onChange={e => this.change(e)}
                />
                <br />
                <input
                    name="image"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                />
                <br />
                <select name="homeType"
                        placeholder="homeType"
                        value={this.state.homeType}
                        onChange={e => this.change(e)}>
                    <option value="apartment">apartment</option>
                    <option value="house">house</option>
                    <option value="studio">studio</option>
                </select>
                <br />
                <input
                    name="bedrooms"
                    type="bedrooms"
                    placeholder="bedrooms"
                    value={this.state.bedrooms}
                    onChange={e => this.change(e)}
                />
                <br />

                <button onClick={e => this.onSubmit(e)}>Submit</button>
            </form>
                </div>
        );
}
export default creatAdvertisement;