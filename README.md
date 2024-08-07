## Purpose
In computer science class, me and Max [https://github.com/Maxwell-Adams] were bored learning Java recursion and decided to try to make an evolution simulator using python. (Note: notice in this github there is only a javascript version, I hand transfered all the code to javascript in under half an hour to make a web client, yes im the javascript G.O.A.T) 

## Docs
Once you open the website, you are greeted with a blank canvas. If you press run (green button in bottom bar) food starts spawning in the canvas. From food, creatures can grow (creatures are arrows, indicating which direction they are facing). Let it sit for a while and you will notice the creatures have a move set which repeats, you can see which move set they have in the ranking chart on the right, or just by analyzing their movements. 

They can do 4 things, move forwards in whichever direction they are facing, turn left/right, and stop (m, l, r, s). Initially they can have a "AI String" which is 3 characters long and loops infinitely, going through 1 character each game tick. This dictates their behaviour, for example the ai string "mls" would make a creature that coninously goes forwards, turns left, then sleeps for a turn. Each move consumes energy which can be decided in the settings.

# Utility Tools
Top Bar: You can place down whichever object is selected onto the canvas by clicking the square you want to place it on. You can place terrain, food, or creatures.

Dimensions: You can change the dimensions by typing in a new dimension (ex. 3x20, size limit based on your screen size) and pressing run/stopping then running again.

Speed Arrow: You can change the speed the game runs at by clicking. Options are normal (blue, 1x), speedy (red, 2x), and hyper (yellow, 100x). Normal is good for analyzing creature movement early on, while speedy is good for analyzing at a good pace with more creatures, and hyper is good for quickly evolving and going through iterations.

Settings: In the settings, you can change petri parameters like food spawn rate, the energy a creature needs to reproduce, etc etc. you can also change the creatures ai (not currently mutation chance), the cost of moves and what moves can be avaliable. If you make a move unavaliable, it simply makes it so any future creatures can't spawn with it and dosen't change any existing creatures. You can experiment with making different costs and watch the resulting chaos, to see which creature evolves. Ex. making stop cost 0 energy, eventually the entire board will be covered in 100% sleeping creatures which can't reproduce.

## Bonus
While making this we were inspired by The Life Engine [https://thelifeengine.net/], and wanted to go with a slightly simpler direction. 

We didn't know it was a thing/had a name, but it turns out what we created is called the genetic algorithm, and we just stumbled upon it by chance while trying to make something interesting.

Lagso stands for learning and growing synthetic organisms, but really it was just a cool 5 letter domain I wanted to pick up before it got snatched.
