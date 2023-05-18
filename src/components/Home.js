import { Alert, Button, Container, Row, Col } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton'
import '../Home.css'

function Home(props) {


    return (
        <Container className=' w-50' id='custom'>
            <Button className='mt-4' onClick={() => props.setRows([{ id: Math.max(...props.rows.map((e) => e.id)) + 1, value: 0, sign: "plus/minus", enable: false }, ...props.rows])}>Add</Button>
            {props.errorMsg ? <Alert className='mt-3' variant='danger' onClose={() => props.setErrorMsg('')} dismissible>{props.errorMsg}</Alert> : false}
            {props.rows.map((obj) => (
                <CalculatorRow obj={obj} deleteRow={props.deleteRow} setEnable={props.setEnable} setSign={props.setSign} setValue={props.setValue} calculateResult={props.calculateResult} setErrorMsg={props.setErrorMsg} />
            ))}
            <Result result={props.result} />
        </Container>
    );
}

function Result(props) {
    return (
        <Row className='justify-content-center align-items-center mb-5'>
            <Col className='col-7'>
                <input value={props.result} type="number" className="form-control" placeholder="0" disabled={true} />
            </Col>
        </Row>
    );
}

function CalculatorRow(props) {
    const radios = [
        { name: 'Active', value: 'plus' },
        { name: 'Radio', value: 'minus' },
    ];
    return (

        <Row className='justify-content-center align-items-center mb-4'>
            <Col className='col-2'>
                {props.obj.sign == "plus/minus" ?
                    <ButtonGroup >
                        {radios.map((radio, id) => (
                            <ToggleButton
                                key={id}
                                id={`radio-${id}`}
                                type="radio"
                                variant={id == 0 ? "primary" : "secondary"}
                                onChange={() => props.setSign(props.obj, radio.value)}
                            >
                                {id == 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                </svg>}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    :
                    <div>
                        {props.obj.sign == "minus" ?
                            <Button onClick={() => props.setSign(props.obj, "plus")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                </svg>
                            </Button>
                            :
                            <Button onClick={() => props.setSign(props.obj, "minus")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </Button>
                        }
                    </div>
                }
            </Col>
            <Col className='col-3'>
                <div >
                <input onChange={event => {
                        let input=isNaN(event.target.value)?0:event.target.value;
                        props.setValue(props.obj, input);
                    }} value={props.obj.value} type="text" pattern="[0-9]*" className="form-control" placeholder="0" />
                </div>
            </Col>
            <Col className='col-1'>
                <Button onClick={() => { props.deleteRow(props.obj.id) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                </Button>
            </Col>
            <Col className='col-1'>
                {props.obj.enable ? <Button onClick={() => { props.setEnable(props.obj) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-toggle-on" viewBox="0 0 16 16">
                        <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                    </svg>
                </Button> : <Button onClick={() => { props.setEnable(props.obj) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-toggle-off" viewBox="0 0 16 16">
                        <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
                    </svg>
                </Button>}
            </Col>
        </Row>
    );
}

export { Home };