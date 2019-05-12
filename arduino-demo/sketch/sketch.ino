#include <WebUSB.h>
#include <Servo.h>

WebUSB WebUSBSerial(0 /* http:// */, "localhost:8080");

#define Serial WebUSBSerial

int lightPin;
int previousLightPin;
int color;
int previousColor;
int wave;

int servoPin = 3;
Servo myServo;

void setup()
{
  while (!Serial)
  {
    ;
  }
  Serial.begin(9600);
  Serial.flush();
  previousLightPin = 0;
  previousColor = 0;
  myServo.attach(servoPin);
}

void loop()
{
  if (Serial && Serial.available())
  {
    lightPin = Serial.read();
    color = Serial.read();
    if (previousLightPin != lightPin || previousColor != color)
    {
      analogWrite(lightPin, color);
      previousLightPin = lightPin;
      previousColor = color;
    }
    wave = Serial.read();
  }
  if (wave == 1)
  {
    myServo.write(0);
    delay(500);
    myServo.write(180);
    delay(500);
  }
  else
  {
    myServo.write(0);
  }
}
