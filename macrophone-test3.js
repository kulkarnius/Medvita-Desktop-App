const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fs = require('fs')
const port = new SerialPort('COM3', {baudRate: 62500})
const { PerformanceObserver, performance } = require('perf_hooks');
writer_boi = fs.createWriteStream('testing.txt')
//const parser = port.pipe(new Readline({ encoding: 'UTF-8' }))
//parser.setMaxListeners(2000)

//legacy
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//not necesscary atm
function bin_to_dec(binary_str) {
    placeholder = binary_str.split('')
    output = 0
    i = 0
    while (placeholder.length > 0) {
      output += placeholder[placeholder.length - 1] * (2 ** i)
      i++
      placeholder.pop()
    }
    return output
}

//writes to port
function write_to_port(input_char) {
    port.write(input_char)
    //console.log(Date.now() + ' w')
    /*
    parser.on('data', function(output){
        console.log(output)
        writer_boi.write(output + ', \n')
        console.log(Date.now())
    })
    */
}

//currently legacy
function read_from_port(input_char) {
    parser.on('data', function(output) {
        console.log(output)
        //console.log('commence primary ignition')
        writer_boi.write((bin_to_dec(output))/204.6 + ',')
        console.log(Date.now() + ' r')

    })
}

//not necesscary atm
function hex_to_dec(input_buff) {
    return (input_buff[0] * 256 + input_buff[1])
}

//console.log(performance.now())
write_to_port('0')
//writer_boi.write(performance.now().toString())


//port.pipe(writer_boi)

port.on('data', function(output) {
    //console.log(output)
    writer_boi.write(output + ' ' + performance.now() + '\n')
})


setTimeout((function() {
    return process.exit(22);
}), 15000);