# Israel Coronavirus Stats

Website containing various statistics on the Coronavirus in Israel.


## Development

As this repo contains a submodule, you should clone it like so:

```bash
$ git clone --recurse-submodules https://github.com/itaisteinherz/israel-coronavirus-stats.git
```

Then, install the required dependencies in a virtualenv:

```bash
$ pip install -r requirements.txt
```

To generate the frontend, run the following command (in the root directory of the project):

```bash
$ python3 source/generate_frontend.py
```

The generated frontend will then be in the `dist` directory.


## Disclaimer

This project by no means serves as medical guidance, nor is it a commercial project or one operated by the State of Israel. I working on it myself in my free time for learning purposes, and cannot guarantee the provided data's accuracy, its usefulness, nor its relevance. Use at your discretion.

All rights to the data used in this project go to the [2019 Novel Coronavirus COVID-19 (2019-nCoV) Data Repository by Johns Hopkins CSSE](https://github.com/CSSEGISandData/COVID-19).


## License

MIT © [Itai Steinherz](https://github.com/itaisteinherz)
