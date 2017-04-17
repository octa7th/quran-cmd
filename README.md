# Al-Quran Command Line

Script to get quran translation from specific or random verse.

## Installation

```sh
git clone https://github.com/octa7th/quran-cmd.git ~/.quran
```
Load the function in your bash profile.

```sh
echo 'source $HOME/.quran/function' >> ~/.bashrc
```

### Dependencies

This script required these dependencies to be able to run.

* nodejs
* boxes `sudo apt install boxes` if you want to display with a pretty frame.

## Usage

### Display random when open terminal.

```sh
echo 'printRandomByClassification' >> ~/.bashrc
```

You'll get a nice Quran quote when opening new terminal.

```
 ________________________________________________________________________________
/\                                                                               \
\_|  Atau patutkah mereka mengambil pelindung-pelindung selain Allah? Maka       |
  |  Allah, Dialah pelindung (yang sebenarnya) dan Dia menghidupkan orang-orang  |
  |  yang mati, dan Dia adalah Maha Kuasa atas segala sesuatu.                   |
  |  QS.as-Syura(42):9                                                           |
  |   ___________________________________________________________________________|_
   \_/_____________________________________________________________________________/

[eos: ~] →
```

### Get specific verse.

```sh
$ getVerse 2:5
Mereka itulah yang tetap mendapat petunjuk dari Tuhan mereka, dan merekalah orang-orang yang beruntung.
QS. al-Baqarah(2):5
```
