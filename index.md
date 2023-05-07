---
layout: default
---

![](https://andreazignoli.github.io/images/front_cover_blog_5.png)

**Oxynet is a set of tools for automatic interpretation of cardiopulmonary exercising tests data.**

💻 [Try the web app](https://oxynetresearch.promfacility.eu)

🐍 [Install the Python package](https://pypi.org/project/pyoxynet/)

📁 [Read the docs](https://pyoxynet.readthedocs.io/en/latest/index.html)

## Contributing to the Oxynet project

There are challenges that transcend both national and continental boundaries and providing people with universal access to good quality health care is one of them. Emerging technologies in the field of AI and the availability of vast amounts of data can offer big opportunities to stimulate innovation and develop solutions.

*Oxynet* wants to become a tool for a quick and encompassing diagnosis of medical conditions with cardiopulmonary exercise tests (CPET) and promote accurate and timely clinical decisions, ultimately reducing the costs associated with current evaluation errors and delays.

The main building blocks of Oxynet are: 

* A network of experts in the field of CPET
* A large crowd sourced data set
* An AI algorithm able to approximate human cognition in the analysis of CPET 

We are interested in creating more research opportunities with other Universities and Departments, hospitals and clinics, medical doctors and physiologists (also operating in intensive care units), companies involved in the development (including patenting and validation) and in the commercialization of medical devices (e.g. metabolic carts and medical software). 

We want to bring together key actors from across sectors to jointly implement our R&D road map and: support the research activities financially (including scholarships for research fellows or publication fees for open access journals), provide intellectual contribution for scientific publications or grant application, share data for testing/developing new algorithms, develop web-based applications (e.g. crowd sourcing applications, automatic interpretation of new data, websites for communicating the outcomes of the project), conduct market and patent analyses, and validate the algorithms for clinical settings.

## The *Pyoxynet* package

*Pyoxynet* is a collection of algorithms developed in the context of the *Oxynet* project. All the algorithms are constituted by deep neural networks, i.e. models conceived to process cardiopulmonary exercise test data (CPET). 

All the models are [Keras](https://keras.io/) models trained and tested with [Tensorflow](https://www.tensorflow.org/), and they are included in *Pyoxynet* only in their [TFLite](https://www.tensorflow.org/lite) inference version in versions <11.6. TFLite has been intentionally adopted to keep the package light and fast. However, after version 11.6 the [Tensorflow](https://www.tensorflow.org/) models are directly used.

To date, mainly two type of models are implemented: 

* The *inference* model: it takes some CPET data as input and it provides an estimation of the exercise intensity domains 
* The *generator* model: it generates new synthetic CPET data

### Pip install the package

☝️ This package was developed under **Python 3.8**, so it might not work properly under older versions. The reason why the 3.8 version is not updated to more recent versions is related to the way packages are now distributed and installed for versions >3.8.   

To the best of my knowledge, this is the best solution for those Python users who would like to have *Oxynet* algorithms always on the tip of their fingers. Assuming you have pip installed on your machine, begin with: 

```sh
pip install pyoxynet
```

Or, alternatively, 

```sh
pip install git+https://github.com/andreazignoli/pyoxynet.git#subdirectory=pyoxynet
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

Data required for the *inference* include oxygen uptake (VO2), exhaled CO2 (VCO2), minute ventilation (VE), end tidal O2 (PetO2) and CO2(PetCO2), and ventilatory equivalents (VEVO2 and VEVCO2).

*Oxynet* inference models work on data over-sampled on a sec-by-sec basis. When dealing with breath-by-breath data, linear interpolation at 1 second is appropriate in my experience (little error is introduced). When dealing with averaged 5-by-5 second data or 10-by-10 second data, cubic interpolation is more appropriate in my experience. *Pyoxynet* however, can implement a number of interpolation algorithm to process raw data as well as data already processed. 

If you want to see how *Pyoxynet* can work on sample data:

```python
import pyoxynet

# Load the TFL model
tfl_model = pyoxynet.load_tf_model()

# Make inference on a random input
test_tfl_model(tfl_model)

# Plot the inference on a test dataset
pyoxynet.test_pyoxynet()
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GENERATION -->
## Generation

*Pyoxynet* also implements a Conditional Generative Adversarial Network, which has been trained to generate deceptive CPET data. As per the *inference* model, the *generator* is saved in a TFLite model file. Calling the related function and obtain a fake CPET data sample can be done as follows: 

```python
from pyoxynet import *
# Call the generator
generator = load_tf_generator()
# Generate a Pandas df with fake CPET data inside
df = generate_CPET(generator, plot=True)
# Call Oxynet for inference on fake data
test_pyoxynet(input_df=df)
```

Fake data provided during the *generation* include oxygen uptake (VO2), exhaled CO2 (VCO2), minute ventilation (VE), heart rate (HR), respiratory frequency (RF), and end tidal O2 (PetO2) and CO2(PetCO2) (*generation therefore does not provide and ventilatory equivalents*):

Importantly, given that RF data is generated, a complete breath-by-breath dataset can be generated. In the gif below, different epochs/steps of the training process are presented for the Conditional Adversarial Neural Network available in *Pyoxynet*. 

<p align="right">(<a href="#top">back to top</a>)</p>

## Contacts

📧 Feedback & Issues - oxynetcpetinterpreter@gmail.com

📧 PI: Andrea Zignoli - andrea.zignoli@unitn.it

<p align="right">(<a href="#top">back to top</a>)</p>

## Publications

You can read more about the rationale and the technology behind the *Oxynet* project at the following links: 

* [Research](https://www.sciencedirect.com/science/article/abs/pii/S1746809423002690) paper about the application of the collective intelligence concept to the automatic interpretation of CPET with AI techniques
* [Review](https://link.springer.com/article/10.1007%2Fs11332-019-00557-x) paper on the AI technologies applied to exercise cardiopulmonary and metabolic data processing
* [Research](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0229466) implementing an LSTM neural networks to the estimation of VO2 during cycling exercise (regressor)
* [Research](https://www.tandfonline.com/doi/abs/10.1080/17461391.2019.1587523?journalCode=tejs20) implementing an LSTM neural networks to the estimation of the intensity domain during incremental exercise (classifier)
* [Research](https://www.tandfonline.com/doi/abs/10.1080/17461391.2020.1866081?journalCode=tejs20) implementing a crowd sourcing and CNN inference to the problem of determining the intensity domain during incremental exercise (classifier)
* [Research](https://www.overleaf.com/read/fcmwscvyhtfq) generating synthetic CPET data with conditional GANs
* [Research](https://www.mdpi.com/1424-8220/23/2/826) from regression to generation to explanation
* [LinkedIn article](https://www.linkedin.com/pulse/oxynet-collective-intelligence-approach-test-andrea-zignoli/) about the Oxynet project
* [Blog article](https://andreazignoli.github.io/blog-post-5/) about the problem of adopting AI models in the interpretation of CPET data
* [Medium Story](https://medium.com/@andrea.zignoli/automatic-interpretation-of-cardiopulmonary-exercise-tests-with-deep-learning-2c9b3920ad51) about how to use the Python package to make an inference on a generic CPET file
* [Medium Story](https://medium.com/@andrea.zignoli/automatic-generation-of-cardiopulmonary-exercise-tests-with-deep-learning-d1f2cab4e765) about how to use the Python package with a generic CPET file about how to use the Python package to generate a fake-but-realistic CPET file

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

The followings are valuable source of knowledge and inspiration for both the *Pyoxynet* and *Oxynet* projects:

* [TFLite inference](https://www.tensorflow.org/lite/guide/inference)
* [Amazon Lightsail](https://aws.amazon.com/getting-started/hands-on/serve-a-flask-app/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)
* [Uniplot Python library](https://github.com/olavolav/uniplot)
* [Machine Learning Mastery cGAN](https://machinelearningmastery.com/how-to-develop-a-conditional-generative-adversarial-network-from-scratch/)
* [Exercise Threshold](https://www.exercisethresholds.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

# Disclaimer

All content found on this website, including: text, images, tables, or other formats are created for informational purposes only. The information provided by this software is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something has been provided by this software.

<p align="right">(<a href="#top">back to top</a>)</p>
