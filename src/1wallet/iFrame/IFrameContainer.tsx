import React, {useState, useCallback} from 'react';
import './IFrameContainer.css';
import * as ONEWallet from './oneWalletIFrame'

const blockExplorerMainnetURL = 'https://explorer.harmony.one/tx/'
const blockExplorerTestnetURL = 'https://explorer.pops.one/tx/'

function IFrameContainer() {
    const [address, setAddress] = useState('')

    const [amount, setAmount] = useState(2)
    const [recipient, setRecipient] = useState('')

    const auth = async () => {
        const res = await ONEWallet.auth()
        setAddress(res as string)
    }

    const send = async (from: string, to: string, amount: number) => {
        try {
            const res = await ONEWallet.send(from, to, amount)
            alert(`Transaction ${res} sent!`)
        } catch (e) {
            alert('Failed to send the transaction')
        }
    }

    const handleOnChange = useCallback(event => {
        const {name, value} = event.target
        if (name === 'amount') {
            setAmount(value)
        } else {
            setRecipient(value)
        }
    }, [amount, recipient])

    return (
        <div>
            <div>
                Send ONE Tokens<br/>
                <span style={{fontSize: '14px'}}>
                    {address && <>From {address}</>}
                </span>
            </div>
            <div className="container">
                <input onChange={handleOnChange}
                       value={amount}
                       name="amount" className="input-field" type="number" placeholder="Amount"/>
            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    value={recipient}
                    name="recipient" className="input-field" type="text" placeholder="Recipient Address (HEX)"/>
            </div>

            <div style={{marginTop: '18px'}}>
                {(amount && recipient && address) ?
                    <button className="btn" onClick={() => send(address, recipient, +amount)}>Send ONE
                        Tokens</button> : null}
            </div>

            <div style={{marginTop: '18px'}}>
                {!address && <button className="btn" onClick={auth}>Connect ONE Wallet</button>}
                {address && <button className="btn" onClick={() => setAddress('')}>Disconnect ONE Wallet</button>}
            </div>
        </div>
    );
}

export default IFrameContainer;
