module.exports = function (ms) {
    const sab = new SharedArrayBuffer(1024);
    const int32 = new Int32Array(sab);
    Atomics.wait(int32, 0, 0, ms);
}