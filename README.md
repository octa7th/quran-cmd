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

Set default language to display. Currently only support `en` english and `id` indonesian.

```sh
echo 'DEFAULT_QURAN_LANGUAGE=id' >> ~/.bashrc
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
 ______________________________________________________________________________
/\                                                                             \
\_|  Or have they taken protectors [or allies] besides him? But Allah - He is  |
  |  the Protector, and He gives life to the dead, and He is over all things   |
  |  competent.                                                                |
  |  QS. Esh-Shura(42):9                                                       |
  |   _________________________________________________________________________|_
   \_/___________________________________________________________________________/

[eos: ~] →
```

### Get specific verse.

```sh
$ getVerse 2:5
Those are upon [right] guidance from their Lord, and it is those who are the successful.
QS. El-Bacara(2):5
```
