// What factor to (x:1) to use for fast clock calculations
// Used when calculating how long things like pumping air or walking a train takes.
var FAST_CLOCK_SPEED = 4; 

// What is the maximum chance (.1 = 10% max) of a failure of an airbrake component.
// Used when calculating the failure rate of a failure during airbrake tests.
var MAX_AIRBRAKE_FAILURE_RATE = .1; 


// What is the maximum chance (.1 = 10% max) that handbrakes applied aren't enough.
// Used when calculating the failure rate of a failure during handbrake tests.
var MAX_HANDBRAKE_FAILURE_RATE = .1; 
MAX_HANDBRAKE_FAILURE_RATE = 1; 
