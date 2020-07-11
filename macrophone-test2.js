const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fs = require('fs')
const port = new SerialPort('COM3', {baudRate: 62500})
writer_boi = fs.createWriteStream('testing.txt')

function buffer_to_number(buffer) {

}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

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

function write_to_file_arr (input_arr) {
    i = 0
    while (i < input_arr.length) {
        fs.appendFile('testing.txt', input_arr[i] + ',' + '\n', function (err) {
            if (err) throw err;
            sleep(25)
            //console.log('Saved! ' + i.toString());
        });
        i++
    }
}

//const parser = port.pipe(new Readline({ encoding: 'UTF-8' }))
//parser.setMaxListeners(2000)

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

function read_from_port(input_char) {
    parser.on('data', function(output) {
        console.log(output)
        //console.log('commence primary ignition')
        writer_boi.write((bin_to_dec(output))/204.6 + ',')
        console.log(Date.now() + ' r')
        //write_to_port(input_char)

        //console.log(iterator)
        //input_array.push(output)
        //console.log(input_array)
        //writer_boi.write(input_array[iterator] + ', \n')
        //return input_array
    })
}

function ddos(input_char, no_of_attk) {
    i = 0
    port.write(input_char)
    while (i < no_of_attk) {
        //write_to_port(input_char)
        sleep(100)
        read_from_port(input_char)
        //console.log(i)
        i++
    }
}
write_to_port('0')
port.on('data', function(output) {
    random_array = []
    //console.log(output)
    for (const value of output.values()) {
        writer_boi.write(value + ' ' + performance.now() + " \n")
        /*
        if (random_array.length == 3) {
            console.log(hex_to_dec(random_array))
            writer_boi.write((hex_to_dec(random_array)).toString() + ' '+ Date.now() + ' \n')
        }
        */
    }
    //console.log(output.values())

    //writer_boi.write(((output)) + ', ' + Date.now() + ' \n')
})

function hex_to_dec(input_buff) {
    return (input_buff[0] * 256 + input_buff[1])
}

//read_from_port('p')

//write_to_port('2')
//ddos('2 \n', 1)


setTimeout((function() {
    return process.exit(22);
}), 2000);